const ReleaseModel = require('../../db/models/ReleaseModel');

module.exports = (id) => (
  new Promise((resolve, reject) => {
    ReleaseModel
      .findByIdAndDelete(id, err => {
        if (err) reject(err);
        resolve();
      })
      .orFail(() => reject(new Error('Release not found')));
  })
);
