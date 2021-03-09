const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const mongoose = require('mongoose');

const dbName =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_DB
    : process.env.MONGO_DB;

console.log(dbName);

const mongoURI = process.env.MONGO_URL + dbName;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(mongoURI, options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('MongoDB Connected...');
});

module.exports = db;
