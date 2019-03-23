const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../db/models/UserModel');

const jwtOptions = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('authorization'),
};

const strategy = new Strategy(jwtOptions, (payload, done) => {
  User.findById(payload.userId, (err, user) => {
    if (err) return done(err, false);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

module.exports = strategy;
