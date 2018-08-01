import bcrypt from 'bcrypt-nodejs';
import User from '../models/UserModel';
import LocalStrategy from 'passport-local';

export default new LocalStrategy((username, password, done) => {
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
