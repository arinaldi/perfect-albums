const User = require('../../models/user');
const { ERRORS } = require('../../constants');
const { decodeToken, getToken } = require('./utils');

const checkUser = async (req, res) => {
  const token = getToken(req.headers.authorization);

  try {
    const data = decodeToken(token);

    if (data && data.user) {
      const user = await User.findById(data.user._id);

      if (user) return res.send('User is valid');
      return res.status(404).send(ERRORS.USER.NOT_FOUND);
    }

    return res.status(401).json(ERRORS.USER.NOT_VALID);
  } catch (err) {
    res.status(500).send(ERRORS.GENERIC);
  }
};

module.exports = checkUser;
