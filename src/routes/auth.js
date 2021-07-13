const router = require('express').Router();
const passport = require('passport');

const signIn = require('../controllers/auth/signIn');
const checkUser = require('../controllers/auth/checkUser');
require('../services/passport');

const signinStrategy = passport.authenticate('signinStrategy', {
  session: false,
});

// router.post('/api/signup', signUp );
router.post('/api/signin', signinStrategy, signIn);
router.get('/api/auth', checkUser);

module.exports = router;
