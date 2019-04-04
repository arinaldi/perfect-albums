const mongoose = require('mongoose');

const DB_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

function connect () {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      const { Mockgoose } = require('mockgoose');
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect('mongodb://localhost:27017/tester', DB_OPTIONS);
          mongoose.connection.on('error', err => {
            reject(err);
          });
          mongoose.connection.once('open', () => {
            resolve();
          });
        });
    } else {
      mongoose.connect(process.env.DATABASE, DB_OPTIONS);
      mongoose.connection.on('error', err => {
        // eslint-disable-next-line no-console
        console.log('Connection error', err.message);
        reject(err);
      });
      mongoose.connection.once('open', () => {
        // eslint-disable-next-line no-console
        console.log('Connected to MongoDB');
        resolve();
      });
    }
  });
}

function close () {
  return mongoose.disconnect();
}

module.exports = { connect, close };
