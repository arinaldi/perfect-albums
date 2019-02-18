const AlbumModel = require('../../models/AlbumModel');

module.exports = (id) => (
  new Promise((resolve, reject) => {
    AlbumModel.findById(id)
      .exec((err, album) => {
        if (err) reject(err);
        resolve(album);
      });
  })
);
