const { Mockgoose } = require('mockgoose');
const mongoose = require('mongoose');
const LOCAL_DB = 'mongodb://localhost:27017/tester';

function connect () {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(
            LOCAL_DB,
            { useNewUrlParser: true, useCreateIndex: true },
          );
          mongoose.connection.on('error', err => {
            reject(err);
          });
          mongoose.connection.once('open', () => {
            resolve();
          });
        });
    } else {
      mongoose.connect(
        process.env.DATABASE,
        { useNewUrlParser: true, useCreateIndex: true },
      );
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
