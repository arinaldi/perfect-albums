require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const publicRoutes = require('./routes/public');
const privateRoutes = require('./routes/private');

const app = express();

const staticFiles = express.static(path.join(__dirname, '../client/dist'));

app
  .use(cors())
  .use(bodyParser.json())
  .use(staticFiles)
  .use(authRoutes)
  .use(publicRoutes)
  .get('*', staticFiles)
  .use(passport.authenticate('authStrategy', { session: false }))
  .use(privateRoutes);

module.exports = app;
