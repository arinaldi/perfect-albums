const Album = require('../../models/album');

module.exports = (date) => (
  new Promise((resolve, reject) => {
    Album
      .where('createdAt').gte(date)
      .sort({ artist: 'asc' })
      .exec((err, albums) => {
        if (err) reject(err);
        resolve(albums);
      });
  })
);
