const Album = require('../../models/album');
const { ERRORS } = require('../../constants');

module.exports = (id) => (
  new Promise((resolve, reject) => {
    Album
      .findByIdAndDelete(id, (err) => {
        if (err) reject(err);
        resolve();
      })
      .orFail(() => reject(new Error(ERRORS.ALBUM)));
  })
);
