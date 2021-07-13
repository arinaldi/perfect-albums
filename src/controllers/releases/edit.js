const Release = require('../../models/release');

module.exports = (id, data) =>
  new Promise((resolve, reject) => {
    Release.findByIdAndUpdate(id, data, { new: true }, (err, release) => {
      if (err) reject(err);
      resolve(release);
    });
  });
