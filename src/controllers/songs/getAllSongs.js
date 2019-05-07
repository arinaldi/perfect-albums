const SongModel = require('../../db/models/SongModel');

module.exports = () => (
  new Promise((resolve, reject) => {
    SongModel
      .find({})
      .sort({
        createdAt: 'desc',
      })
      .exec((err, songs) => {
        if (err) reject(err);
        resolve(songs);
      });
  })
);
