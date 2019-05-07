const AlbumModel = require('../../db/models/AlbumModel');

module.exports = () => (
  new Promise((resolve, reject) => {
    AlbumModel
      .find({})
      .exec((err, albums) => {
        if (err) reject(err);
        resolve(albums);
      });
  })
);
