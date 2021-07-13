const Song = require('../../models/song');

module.exports = (data) =>
  new Promise((resolve, reject) => {
    Song.create(data, (err, song) => {
      if (err) reject(err);
      resolve(song);
    });
  });
