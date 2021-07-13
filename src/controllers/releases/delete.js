const Release = require('../../models/release');
const { ERRORS } = require('../../constants');

module.exports = (id) =>
  new Promise((resolve, reject) => {
    Release.findByIdAndDelete(id, (err) => {
      if (err) reject(err);
      resolve();
    }).orFail(() => reject(new Error(ERRORS.RELEASE)));
  });
