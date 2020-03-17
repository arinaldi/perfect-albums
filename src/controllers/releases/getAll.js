const Release = require('../../models/release');
const { TBD } = require('../../constants');
const { formatDate, sortByAlbum } = require('../../utils');

const formatData = (releases) => {
  const results = {};

  releases.forEach((release) => {
    const releaseDate = release.date
      ? formatDate(release.date)
      : TBD;

    if (results[releaseDate]) {
      results[releaseDate].push(release);
    } else {
      results[releaseDate] = [release];
    }
  });

  Object.values(results).forEach((result) => {
    result.sort(sortByAlbum);
  });

  return results;
};

module.exports = () => (
  new Promise((resolve, reject) => {
    Release
      .find({})
      .exec((err, data) => {
        if (err) reject(err);
        const releases = formatData(data);
        resolve(releases);
      });
  })
);
