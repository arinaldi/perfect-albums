const Album = require('../../models/album');

module.exports = () => (
  new Promise((resolve, reject) => {
    Album
      .find({ favorite: true })
      .sort({ year: 'desc', artist: 'asc', title: 'asc' })
      .exec((err, favorites) => {
        if (err) reject(err);
        resolve(favorites);
      });
  })
);
