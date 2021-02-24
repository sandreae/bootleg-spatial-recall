const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URL;
const options = {
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(mongoURI, options);

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ' + mongoURI);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log('handle mongo errored connections: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('App terminated, closing mongo connections');
    process.exit(0);
  });
});
