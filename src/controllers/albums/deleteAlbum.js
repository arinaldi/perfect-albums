const AlbumModel = require('../../db/models/AlbumModel');

module.exports = (id, data) => (
  new Promise((resolve, reject) => {
    AlbumModel.findByIdAndDelete(id, err => {
      if (err) reject(err);
      resolve();
    })
      .orFail(() => reject(new Error('Album not found')));
  })
);
