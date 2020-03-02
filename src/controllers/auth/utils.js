require('dotenv').config();
const jwt = require('jwt-simple');

const { ERRORS, ONE_WEEK } = require('../../constants');

const decodeToken = (token) => {
  try {
    return jwt.decode(token, process.env.SECRET);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(ERRORS.TOKEN, err.message);
  }
};

const getToken = (authHeader = '') => {
  const headers = authHeader.split(' ');
  const tokenIndex = headers.indexOf('Bearer');
  return tokenIndex === -1 ? '' : headers[tokenIndex + 1];
};

const makeToken = (user) => {
  const TIMESTAMP = Math.round(Date.now() / 1000);
  return jwt.encode({
    user,
    iat: TIMESTAMP,
    exp: TIMESTAMP + ONE_WEEK,
  }, process.env.SECRET);
};

module.exports = { decodeToken, getToken, makeToken };
