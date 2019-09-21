const ReleaseModel = require('../../db/models/ReleaseModel');

module.exports = () => (
  new Promise((resolve, reject) => {
    ReleaseModel
      .find({})
      .exec((err, releases) => {
        if (err) reject(err);
        resolve(releases);
      });
  })
);
