require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const publicAlbumRoutes = require('./routes/publicAlbumRoutes');
const privateAlbumRoutes = require('./routes/privateAlbumRoutes');
const authenticationRoutes = require('./routes/AuthenticationRoutes');

// mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();
app
  .use(express.static(path.resolve(__dirname, '../client/build')))
  .use(cors())
  .use(bodyParser.json())
  .use(publicAlbumRoutes)
  .use(authenticationRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const authStrategy = passport.authenticate('authStrategy', { session: false });
app.use(authStrategy);

app.use(privateAlbumRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
