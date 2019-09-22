const AlbumModel = require('../../db/models/AlbumModel');

const formatData = (albums) => {
  const results = {};

  albums.forEach(({ artist, title, year }) => {
    const album = { artist, title };

    if (results[year]) {
      results[year].push(album);
    } else {
      results[year] = [album];
    }
  });

  return results;
};

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
