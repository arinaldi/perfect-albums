const express = require('express');
const cors = require('cors');

const { checkForUser, isAuthorized } = require('./middleware');
const graphql = require('./graphql');
const publicRoutes = require('./routes/public');
const privateRoutes = require('./routes/private');
const { ERRORS } = require('./constants');

const app = express();

app
  .use(cors())
  .use(express.json())
  .use(publicRoutes)
  .use(isAuthorized)
  .use('/graphql', graphql)
  .use(checkForUser)
  .use(privateRoutes);

app.get('/*', (req, res) => {
  res.status(404).json({ message: ERRORS.NOT_FOUND });
});

module.exports = app;
