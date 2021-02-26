const mongoose = require('mongoose');
const slugify = require('slugify');
const ObjectID = require('mongodb').ObjectID;

mongoose.Schema.ObjectId.get((v) => (v != null ? v.toString() : v));

const impulseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An impulse must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'An impulse name must have less or equal then 40 characters',
      ],
      minlength: [
        4,
        'An impulse name must have more or equal then 4 characters',
      ],
    },
    slug: String,
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: [true, 'An impulse must have a location'],
    },
    gpsLocation: {
      type: Object,
      default: {
        latitude: Number,
        longitude: Number,
      },
    },
    description: {
      type: String,
      required: true,
    },
    audioFile: {
      type: String,
      required: [
        true,
        'An audio sample must be uploaded with each impulse entry',
      ],
    },
    imageFile: {
      type: String,
      required: [
        true,
        'An image must be uploaded with each impulse entry',
      ],
    },
  },
  { timestamps: true },
);

impulseSchema.statics.addImpulse = async function (impulse) {
  const Impulse = new this(impulse);
  const result = await Impulse.save(impulse);
  return result;
};

impulseSchema.statics.listImpulses = async function () {
  return await this.find();
};

impulseSchema.statics.deleteImpulse = async function (_id) {
  return await this.deleteOne({ _id: ObjectID(_id) });
};

impulseSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('impulse', impulseSchema);
