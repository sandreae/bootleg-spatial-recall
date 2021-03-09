const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URL + process.env.TEST_MONGO_DB;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };
  await mongoose.connect(mongoURI, options);
};

const disconnectDB = async (collectionName) => {
  const collection = mongoose.connection.collections[collectionName];
  try {
    await collection.drop();
  } catch (error) {
    if (error.message === 'ns not found') return;
    if (
      error.message.includes(
        'a background operation is currently running',
      )
    )
      return;
  }
  await mongoose.connection.close();
};

exports.connectDB = connectDB;
exports.disconnectDB = disconnectDB;
