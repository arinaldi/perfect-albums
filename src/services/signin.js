const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/UserModel');

const localStrategy = new LocalStrategy((username, password, done) => {
  User
    .findOne({ username })
    .exec()
    .then(user => {
      if (!user) return done(null, false);

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return done(err, false);
        if (!isMatch) return done(null, false);

        return done(null, user);
      });
    })
    .catch(err => done(err, false));
});

module.exports = localStrategy;
