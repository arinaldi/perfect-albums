const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt-nodejs');
const User = require('../db/models/UserModel');

const localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });

    if (!user) return done(null, false);

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return done(err, false);
      if (!isMatch) return done(null, false);

      return done(null, user);
    });
  } catch (err) {
    done(err, false);
  }
});

module.exports = localStrategy;
