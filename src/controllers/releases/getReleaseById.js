const ReleaseModel = require('../../db/models/ReleaseModel');

module.exports = (id) => (
  new Promise((resolve, reject) => {
    ReleaseModel
      .findById(id)
      .exec((err, release) => {
        if (err) reject(err);
        resolve(release);
      });
  })
);
