const Album = require('../../models/album');
const { getRandomInt } = require('../../utils');

module.exports = () =>
  new Promise((resolve, reject) => {
    const query = Album.findOne();

    query.countDocuments((_, count) => {
      const index = getRandomInt(0, count - 1);

      query.skip(index).exec('findOne', (err, album) => {
        if (err) reject(err);
        if (album) {
          resolve(album);
        } else {
          resolve({});
        }
      });
    });
  });
