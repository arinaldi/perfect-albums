const ReleaseModel = require('../../db/models/ReleaseModel');
const { TBD } = require('../../constants');
const { formatDate } = require('../../utils');

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

  return results;
};

module.exports = () => (
  new Promise((resolve, reject) => {
    ReleaseModel
      .find({})
      .exec((err, data) => {
        if (err) reject(err);
        const releases = formatData(data);
        resolve(releases);
      });
  })
);
