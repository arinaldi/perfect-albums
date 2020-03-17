const Song = require('../../models/song');

module.exports = () => (
  new Promise((resolve, reject) => {
    Song
      .find({})
      .sort({
        createdAt: 'desc',
      })
      .exec((err, songs) => {
        if (err) reject(err);
        resolve(songs);
      });
  })
);
