const { makeToken } = require('./utils');

const signIn = (req, res) => {
  res.json({ token: makeToken(req.user) });
};

module.exports = signIn;
