const Album = require('../../models/album');

module.exports = (id) =>
  new Promise((resolve, reject) => {
    Album.findById(id).exec((err, album) => {
      if (err) reject(err);
      resolve(album);
    });
  });
