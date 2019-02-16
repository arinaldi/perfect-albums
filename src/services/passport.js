const passport = require('passport');
const signinStrategy = require('./signin');
const authStrategy = require('./authentication');

passport.use('signinStrategy', signinStrategy);
passport.use('authStrategy', authStrategy);
