const router = require('express').Router();
const passport = require('passport');
const { signIn, checkUser } = require('../controllers/AuthenticationController');
require('../services/passport');

const signinStrategy = passport.authenticate('signinStrategy', { session: false });

// router.post('/api/signup', signUp );
router.post('/api/signin', signinStrategy, signIn);
router.get('/api/auth', checkUser);

module.exports = router;
