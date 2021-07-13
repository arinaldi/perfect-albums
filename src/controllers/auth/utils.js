require('dotenv').config();
const jwt = require('jsonwebtoken');

const { ERRORS } = require('../../constants');

const decodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(ERRORS.TOKEN, err.message);
    }
    return null;
  }
};

const getToken = (authHeader = '') => {
  const headers = authHeader.split(' ');
  const tokenIndex = headers.indexOf('Bearer');
  return tokenIndex === -1 ? '' : headers[tokenIndex + 1];
};

const makeToken = (user) => {
  return jwt.sign({ user: { _id: user._id } }, process.env.SECRET, {
    expiresIn: '7d',
  });
};

module.exports = { decodeToken, getToken, makeToken };
