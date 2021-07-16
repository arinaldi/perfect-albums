const Album = require('../../models/album');

module.exports = () =>
  new Promise((resolve, reject) => {
    Album.find({ cd: true }).exec((err, albums) => {
      if (err) reject(err);
      resolve(albums.length);
    });
  });
