const { decodeToken, getToken } = require('../controllers/auth/utils');

const isAuthorized = async (req, res, next) => {
  const token = getToken(req.headers.authorization);
  const data = decodeToken(token);

  req.isAuthorized = Boolean(data);
  next();
};

module.exports = { isAuthorized };
