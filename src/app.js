require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

const publicRoutes = require('./routes/publicRoutes');
const publicAlbumRoutes = require('./routes/publicAlbumRoutes');
const privateAlbumRoutes = require('./routes/privateAlbumRoutes');
const authenticationRoutes = require('./routes/AuthenticationRoutes');

const app = express();
app
  .use(express.static(path.resolve(__dirname, '../client/build')))
  .use(cors())
  .use(bodyParser.json())
  .use(publicRoutes)
  .use(publicAlbumRoutes)
  .use(authenticationRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const authStrategy = passport.authenticate('authStrategy', { session: false });
app.use(authStrategy);

app.use(privateAlbumRoutes);

module.exports = app;
