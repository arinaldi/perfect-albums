require('dotenv').config();
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import publicAlbumRoutes from './routes/publicAlbumRoutes';
import privateAlbumRoutes from './routes/privateAlbumRoutes';
import authenticationRoutes from './routes/AuthenticationRoutes';
import instaRoutes from './routes/instaRoutes';

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('[mongoose] Connected to MongoDB'))
  .catch((err) => console.log('[mongoose] Error connecting to MongoDB', err));

const app = express();

app
  .use(express.static(path.resolve(__dirname, '../client/build')))
  .use(bodyParser.json())
  .use(publicAlbumRoutes)
  .use(authenticationRoutes)
  .use(instaRoutes);

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
