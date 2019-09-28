const SongModel = require('../../db/models/SongModel');
const { ERRORS } = require('../../constants');

module.exports = (id) => (
  new Promise((resolve, reject) => {
    SongModel
      .findByIdAndDelete(id, err => {
        if (err) reject(err);
        resolve();
      })
      .orFail(() => reject(new Error(ERRORS.SONG)));
  })
);
