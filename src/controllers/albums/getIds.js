const Album = require('../../models/album');

module.exports = () =>
  new Promise((resolve, reject) => {
    Album.distinct('_id').exec((err, ids) => {
      if (err) reject(err);
      resolve(ids);
    });
  });
