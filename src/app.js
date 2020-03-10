require('dotenv').config();
// const path = require('path');
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
  // .use(express.static(path.join(__dirname, '../client/dist')))
  .use(authRoutes)
  .use(publicRoutes);

app
  .use(passport.authenticate('authStrategy', { session: false }))
  .use(privateRoutes);

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// });

module.exports = app;
