const Song = require('../../models/song');
const { ERRORS } = require('../../constants');

module.exports = (id) =>
  new Promise((resolve, reject) => {
    Song.findByIdAndDelete(id, (err) => {
      if (err) reject(err);
      resolve();
    }).orFail(() => reject(new Error(ERRORS.SONG)));
  });
