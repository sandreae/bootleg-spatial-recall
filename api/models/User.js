// const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const ObjectID = require('mongodb').ObjectID;

mongoose.Schema.ObjectId.get((v) => (v != null ? v.toString() : v));

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.statics.addUser = async function (impulse) {
  const User = new this(impulse);
  const result = await User.save(impulse);
  return result;
};

userSchema.statics.listUsers = async function () {
  return await this.find();
};

userSchema.statics.deleteUser = async function (_id) {
  return await this.deleteOne({ _id: ObjectID(_id) });
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);
