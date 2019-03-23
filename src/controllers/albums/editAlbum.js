const AlbumModel = require('../../db/models/AlbumModel');

module.exports = (id, data) => (
  new Promise((resolve, reject) => {
    AlbumModel.findByIdAndUpdate(
      id,
      data,
      { new: true },
      (err, album) => {
        if (err) reject(err);
        resolve(album);
      });
  })
);
