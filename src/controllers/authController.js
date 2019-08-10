require('dotenv').config();
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const User = require('../db/models/UserModel');

const makeToken = (user) => {
  const timestamp = Math.round(Date.now() / 1000);
  const expiry = 60 * 60 * 24 * 7; // one week
  return jwt.encode({
    user,
    iat: timestamp,
    exp: timestamp + expiry,
  }, process.env.SECRET);
};

const getToken = (authHeader = '') => {
  const headers = authHeader.split(' ');
  const tokenIndex = headers.indexOf('Bearer');
  return tokenIndex === -1 ? '' : headers[tokenIndex + 1];
};

const decodeToken = (token) => {
  try {
    return jwt.decode(token, process.env.SECRET);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error decoding token:', err.message);
  }
};

const signIn = (req, res) => {
  res.json({ token: makeToken(req.user) });
};

const checkUser = async (req, res) => {
  const token = getToken(req.headers.authorization);

  try {
    const data = decodeToken(token);

    if (data && data.user) {
      const user = await User.findById(data.user._id);

      if (user) return res.send('User is valid');
      return res.status(404).send('User not found');
    }

    return res.status(401).json('User not valid');
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
};

const saveUser = (username, password) => (
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(password, salt, null, (err, hashedPassword) => {
        if (err) reject(err);
        const user = new User({ username, password: hashedPassword });
        user.save().then(user => resolve(user));
      });
    });
  })
);

const signUp = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(422)
      .json({ error: 'You must provide an username and password' });
  }

  try {
    const user = await User.findOne({ username });

    if (user) return res.status(422).json({ error: 'Username is in use' });

    const newUser = await saveUser(username, password);
    return res.json({ token: makeToken(newUser.id) });
  } catch (err) {
    next(err);
  }
};

module.exports = { signIn, checkUser, signUp, saveUser };
