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
    .withMetadata()
    .toBuffer();

  file.buffer = buffer;
  file.name = file.name.split('.')[0] + '.jpeg';
  return file;
};

exports.compressAudio = async (file) => {
  if (file.name.split('.')[1] === 'wav') {
    const encoder = new Lame({
      output: 'buffer',
      bitrate: 192,
    }).setBuffer(file.buffer);
    try {
      await encoder.encode();
    } catch (error) {
      throw new AppError('Error occured when encoding audio.', 400);
    }
    file.buffer = encoder.getBuffer();
    file.name = file.name.split('.')[0] + '.mp3';
  } else if (file.size > 1 * 1024 * 1024) {
    throw new AppError(
      'Audio file too large (max 1mb), try a different format, wav files will be compressed automatically.',
      400,
    );
  }
  return file;
};
