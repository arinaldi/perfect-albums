const ReleaseModel = require('../../db/models/ReleaseModel');

module.exports = (id, data) => (
  new Promise((resolve, reject) => {
    ReleaseModel.findByIdAndUpdate(
      id,
      data,
      { new: true },
      (err, release) => {
        if (err) reject(err);
        resolve(release);
      });
  })
);
