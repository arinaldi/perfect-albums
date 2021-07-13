const express = require('express');
const cors = require('cors');
const passport = require('passport');

const { isAuthorized } = require('./middleware');
const graphql = require('./graphql');
const authRoutes = require('./routes/auth');
const publicRoutes = require('./routes/public');
const privateRoutes = require('./routes/private');

const app = express();

app
  .use(cors())
  .use(express.json())
  .use(isAuthorized)
  .use('/graphql', graphql)
  .use(authRoutes)
  .use(publicRoutes)
  .use(passport.authenticate('authStrategy', { session: false }))
  .use(privateRoutes);

app.get('/*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = app;
