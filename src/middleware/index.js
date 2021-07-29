const { decodeSupabaseToken, getToken } = require('../utils');
const { ERRORS } = require('../constants');

function checkForUser(req, res, next) {
  if (req.isAuthorized) {
    next();
  } else {
    res.status(401).json({ error: ERRORS.USER.UNAUTHORIZED });
  }
}

async function isAuthorized(req, _, next) {
  const token = getToken(req.headers.authorization);
  let isAuthorized = false;

  if (token) {
    const user = await decodeSupabaseToken(token);
    isAuthorized = Boolean(user);
  }

  req.isAuthorized = isAuthorized;
  next();
}

module.exports = { checkForUser, isAuthorized };
