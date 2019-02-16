const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../controllers/AuthenticationController');
const passport = require('passport');
require('../services/passport');

const signinStrategy = passport.authenticate('signinStrategy', { session: false });

// router.post('/api/signup', signUp );
router.post('/api/signin', signinStrategy, signIn);

module.exports = router;
