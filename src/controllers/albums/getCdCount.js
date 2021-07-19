const Album = require('../../models/album');

module.exports = () =>
  new Promise((resolve, reject) => {
    Album.countDocuments({ cd: true }, (err, count) => {
      if (err) reject(err);
      resolve(count);
    });
  });
