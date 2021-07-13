const Album = require('../../models/album');

module.exports = (id, data) =>
  new Promise((resolve, reject) => {
    Album.findByIdAndUpdate(id, data, { new: true }, (err, album) => {
      if (err) reject(err);
      resolve(album);
    });
  });
