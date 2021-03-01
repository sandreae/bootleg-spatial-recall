const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URL + process.env.MONGO_DB;
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
