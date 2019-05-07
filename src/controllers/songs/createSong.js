const SongModel = require('../../db/models/SongModel');

module.exports = (data) => (
  new Promise((resolve, reject) => {
    SongModel.create(data, (err, song) => {
      if (err) reject(err);
      resolve(song);
    });
  })
);
