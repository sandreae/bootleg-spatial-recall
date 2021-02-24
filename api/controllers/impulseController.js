const multer = require('multer');
const sharp = require('sharp');
const aws = require('aws-sdk');
const slugify = require('slugify');

const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const Impulse = require('./../models/impulseModel');
const catchAsync = require('./../utils/catchAsync');

const spacesEndpoint = new aws.Endpoint(
  'fra1.digitaloceanspaces.com',
);

aws.config.update({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new aws.S3();

const multerFilter = (req, file, cb) => {
  if (
    !file.mimetype.startsWith('image') &&
    !file.mimetype.startsWith('audio')
  ) {
    cb(
      new AppError('Please upload only images and audio files.', 400),
      false,
    );
  }
  cb(null, true);
};

const multerMemoryStorage = multer.memoryStorage();

const preUpload = multer({
  storage: multerMemoryStorage,
  fileFilter: multerFilter,
});

const renameFile = (fileObject, name) => {
  return `${Date.now()}-impulse-${slugify(name, {
    lower: true,
  })}.${fileObject.originalname.split('.')[1]}`;
};

exports.preUpload = preUpload.fields([
  { name: 'impulseFile', maxCount: 1 },
  { name: 'imageFile', maxCount: 1 },
]);

exports.uploadFiles = catchAsync(async (req, res, next) => {
  if (!req.files.imageFile || !req.files.impulseFile) {
    return next(
      new AppError(
        'Please upload both and image and an audio file',
        401,
      ),
    );
  }

  req.files.imageFile[0].filename = renameFile(
    req.files.imageFile[0],
    req.body.name,
  );

  req.files.impulseFile[0].filename = renameFile(
    req.files.impulseFile[0],
    req.body.name,
  );

  await s3
    .putObject({
      Bucket: process.env.DO_BUCKET,
      Key: req.files.imageFile[0].filename,
      Body: req.files.imageFile[0].buffer,
      ACL: 'public-read',
    })
    .promise();

  next();
});

exports.resizeImage = catchAsync(async (req, res, next) => {
  if (!req.files.imageFile) {
    return next();
  }

  if (!req.files.imageFile[0].mimetype.startsWith('image')) {
    return next();
  }

  req.files.imageFile[0].buffer = await sharp(
    req.files.imageFile[0].buffer,
  )
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

  req.files.imageFile[0].originalname =
    req.files.imageFile[0].originalname.split('.')[0] + '.jpeg';
  next();
});

exports.getAllImpulses = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Impulse.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const impulses = await features.query;

  res.status(200).json({
    status: 'success',
    results: impulses.length,
    data: {
      impulses,
    },
  });
});

exports.getImpulse = catchAsync(async (req, res, next) => {
  const impulse = await Impulse.findById(req.params.id);

  if (!impulse) {
    return next(new AppError('No impulse found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      impulse,
    },
  });
});

exports.createImpulse = catchAsync(async (req, res, next) => {
  req.body.imageUrl = `https://${process.env.DO_BUCKET}.${spacesEndpoint.host}/${req.files.imageFile[0].filename}`;
  req.body.audioUrl = `https://${process.env.DO_BUCKET}.${spacesEndpoint.host}/${req.files.impulseFile[0].filename}`;

  const newImpulse = await Impulse.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      impulse: newImpulse,
    },
  });
});

exports.updateImpulse = catchAsync(async (req, res, next) => {
  const impulse = await Impulse.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!impulse) {
    return next(new AppError('No impulse found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      impulse,
    },
  });
});

exports.deleteImpulse = catchAsync(async (req, res, next) => {
  const impulse = await Impulse.findByIdAndDelete(req.params.id);

  if (!impulse) {
    return next(new AppError('No impulse found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
