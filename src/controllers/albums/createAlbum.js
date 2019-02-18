const AlbumModel = require('../../models/AlbumModel');

module.exports = (data) => (
  new Promise((resolve, reject) => {
    AlbumModel.create(data, (err, album) => {
      if (err) reject(err);
      resolve(album);
    });
  })
);
