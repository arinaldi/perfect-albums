require('dotenv').config();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');

const getToken = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ userId: user.id, iat: timestamp }, process.env.SECRET);
};

const signIn = (req, res) => {
  res.json({ token: getToken(req.user)});
};

const saveUser = (username, password, res, next) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(password, salt, null, (error, hashedPassword) => {
      if (error) return next(error);
      const user = new User({ username, password: hashedPassword });
      user
        .save()
        .then(newUser => res.json({ token: getToken(newUser) }));
    });
  });
};
 
const signUp = (req, res, next) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res
      .status(422)
      .json({ error: 'You must provide an username and password' });
  }
  User
    .findOne({ username })
    .exec()
    .then(user => {
      if (user) {
        return res
          .status(422)
          .json({ error: 'Username is in use' });
      }
      saveUser(username, password, res, next);
    })
    .catch(err => next(err));
};

module.exports = { signIn, signUp };
