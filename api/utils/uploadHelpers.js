const slugify = require('slugify');
const sharp = require('sharp');
const Lame = require('node-lame').Lame;
const AppError = require('./appError');

const renameFile = (fileObject, name) => {
  return `${Date.now()}-${slugify(name, {
    lower: true,
  })}.${fileObject.originalname.split('.')[1]}`;
};

exports.fileFilter = (req, file, cb) => {
  if (
    !file.mimetype.startsWith('image') &&
    !file.mimetype.startsWith('audio')
  ) {
    return cb(
      new AppError('Please only upload image or audio files.', 400),
      false,
    );
  }
  // need to move this somewhere after validation happens
  file.name = renameFile(file, req.body.name);
  return cb(null, true);
};

exports.resizeImage = async (file) => {
  const buffer = await sharp(file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

  file.buffer = buffer;
  file.name = file.name.split('.')[0] + '.jpeg';
  return file;
};

exports.compressAudio = async (file) => {
  const encoder = new Lame({
    output: 'buffer',
    bitrate: 192,
  }).setBuffer(file.buffer);

  console.log('Encoding starting');
  await encoder.encode();
  console.log('Encoding finished');
  file.buffer = encoder.getBuffer();
  file.name = file.name.split('.')[0] + '.mp3';
  return file;
};
