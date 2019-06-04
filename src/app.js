require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

const publicRoutes = require('./routes/publicRoutes');
const privateRoutes = require('./routes/privateRoutes');
const authRoutes = require('./routes/authRoutes');

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
  .use(privateRoutes);

module.exports = app;
