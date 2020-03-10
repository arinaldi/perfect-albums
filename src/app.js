require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const publicRoutes = require('./routes/public');
const privateRoutes = require('./routes/private');

const app = express();

app
  .use(cors())
  .use(bodyParser.json())
  .use(authRoutes)
  .use(publicRoutes)
  .use(passport.authenticate('authStrategy', { session: false }))
  .use(privateRoutes)
  .get('/*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });

module.exports = app;
