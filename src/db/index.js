const mongoose = require('mongoose');

const DB_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const connect = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(process.env.DATABASE, DB_OPTIONS);
    mongoose.connection.on('error', (err) => {
      // eslint-disable-next-line no-console
      console.log('Connection error', err.message);
      reject(err);
    });
    mongoose.connection.once('open', () => {
      // eslint-disable-next-line no-console
      console.log('Connected to MongoDB');
      resolve();
    });
  });

const close = () => mongoose.disconnect();

module.exports = { connect, close, DB_OPTIONS };
