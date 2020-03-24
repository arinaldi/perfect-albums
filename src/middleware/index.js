const { decodeToken, getToken } = require('../controllers/auth/utils');

const isAuthorized = async (req, res, next) => {
  const token = getToken(req.headers.authorization);
  let data = false;

  if (token) {
    data = decodeToken(token);
  }

  req.isAuthorized = Boolean(data);
  next();
};

module.exports = { isAuthorized };
