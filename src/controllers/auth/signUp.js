const bcrypt = require('bcrypt-nodejs');

const User = require('../../db/models/UserModel');
const { ERRORS } = require('../../constants');
const { makeToken } = require('./utils');

const saveUser = (username, password) => (
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(password, salt, null, (err, hashedPassword) => {
        if (err) reject(err);
        const user = new User({
          username,
          password: hashedPassword,
        });
        user.save().then((user) => resolve(user));
      });
    });
  })
);

const signUp = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(422)
      .json({ error: ERRORS.USER.CREDENTIALS });
  }

  try {
    const user = await User.findOne({ username });

    if (user) {
      return res.status(422).json({
        error: ERRORS.USER.TAKEN,
      });
    }

    const newUser = await saveUser(username, password);
    return res.json({ token: makeToken(newUser.id) });
  } catch (err) {
    next(err);
  }
};

module.exports = { saveUser, signUp };
