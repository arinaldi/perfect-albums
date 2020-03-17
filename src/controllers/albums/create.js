const Album = require('../../models/album');

module.exports = (data) => (
  new Promise((resolve, reject) => {
    Album.create(data, (err, album) => {
      if (err) reject(err);
      resolve(album);
    });
  })
);
