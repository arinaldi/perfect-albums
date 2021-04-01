const { decodeToken, getToken } = require('../controllers/auth/utils');
const { ERRORS, MAX_REQUEST_COUNT, THIRTY_SECONDS } = require('../constants');

const isAuthorized = async (req, res, next) => {
  const token = getToken(req.headers.authorization);
  let data = false;

  if (token) {
    data = decodeToken(token);
  }

  req.isAuthorized = Boolean(data);
  next();
};

const cache = {};

const rateLimiter = (req, res, next) => {
  const { ip } = req;

  if (cache[ip] === undefined) {
    cache[ip] = [{ createdAt: Date.now() }];
    return next();
  }

  const now = new Date();
  const thirtySecondsAgo = new Date(now.getTime() - THIRTY_SECONDS);
  const requestsInWindow = cache[ip].filter(item => item.createdAt >= thirtySecondsAgo);

  if (requestsInWindow.length < MAX_REQUEST_COUNT) {
    cache[ip].push({ createdAt: Date.now() });
    return next();
  }

  return res.status(429).json({ error: ERRORS.LIMIT_REACHED });
};

module.exports = { isAuthorized, rateLimiter };
