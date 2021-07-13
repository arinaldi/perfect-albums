const Release = require('../../models/release');

module.exports = (data) =>
  new Promise((resolve, reject) => {
    Release.create(data, (err, release) => {
      if (err) reject(err);
      resolve(release);
    });
  });
