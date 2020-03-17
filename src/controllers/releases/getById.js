const Release = require('../../models/release');

module.exports = (id) => (
  new Promise((resolve, reject) => {
    Release
      .findById(id)
      .exec((err, release) => {
        if (err) reject(err);
        resolve(release);
      });
  })
);
