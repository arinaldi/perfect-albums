require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const publicRoutes = require('./routes/public');

const albumRoutes = require('./routes/private/albums');
const releaseRoutes = require('./routes/private/releases');
const songRoutes = require('./routes/private/songs');

const app = express();
app
  .use(express.static(path.resolve(__dirname, '../client/dist')))
  .use(cors())
  .use(bodyParser.json())
  .use(authRoutes)
  .use(publicRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

const authStrategy = passport.authenticate('authStrategy', { session: false });
app
  .use(authStrategy)
  .use(albumRoutes)
  .use(releaseRoutes)
  .use(songRoutes);

module.exports = app;
