const ReleaseModel = require('../../db/models/ReleaseModel');
const { ERRORS } = require('../../constants');

module.exports = (id) => (
  new Promise((resolve, reject) => {
    ReleaseModel
      .findByIdAndDelete(id, (err) => {
        if (err) reject(err);
        resolve();
      })
      .orFail(() => reject(new Error(ERRORS.RELEASE)));
  })
);
