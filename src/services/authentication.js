const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../db/models/UserModel');

const jwtOptions = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('authorization'),
};

const strategy = new Strategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.user._id);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, false);
  }
});

module.exports = strategy;
