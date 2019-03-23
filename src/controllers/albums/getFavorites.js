const AlbumModel = require('../../db/models/AlbumModel');

function formatData (albums) {
  const results = {};
  albums.forEach(({ artist, title, year }) => {
    if (results[year]) {
      results[year].push({
        artist,
        title,
      });
    } else {
      results[year] = [{
        artist,
        title,
      }];
    }
  });
  return results;
}

module.exports = () => (
  new Promise((resolve, reject) => {
    AlbumModel
      .find({ favorite: true })
      .exec((err, albums) => {
        if (err) reject(err);
        const favorites = formatData(albums);
        resolve(favorites);
      });
  })
);
