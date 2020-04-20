const Album = require('../../models/album');

module.exports = () => (
  new Promise((resolve, reject) => {
    Album
      .distinct('artist')
      .exec((err, artists) => {
        if (err) reject(err);
        resolve(artists);
      });
  })
);
