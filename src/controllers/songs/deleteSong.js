const SongModel = require('../../db/models/SongModel');

module.exports = (id) => (
  new Promise((resolve, reject) => {
    SongModel
      .findByIdAndDelete(id, err => {
        if (err) reject(err);
        resolve();
      })
      .orFail(() => reject(new Error('Song not found')));
  })
);
