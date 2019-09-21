const ReleaseModel = require('../../db/models/ReleaseModel');

module.exports = (data) => (
  new Promise((resolve, reject) => {
    ReleaseModel.create(data, (err, release) => {
      if (err) reject(err);
      resolve(release);
    });
  })
);
