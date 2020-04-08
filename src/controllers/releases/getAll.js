const Release = require('../../models/release');

module.exports = () => (
  new Promise((resolve, reject) => {
    Release
      .find({})
      .sort({ date: 'asc', artist: 'asc', title: 'asc' })
      .exec((err, releases) => {
        if (err) reject(err);
        resolve(releases);
      });
  })
);
