require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import publicAlbumRoutes from './routes/publicAlbumRoutes';
import privateAlbumRoutes from './routes/privateAlbumRoutes';
import authenticationRoutes from './routes/AuthenticationRoutes';
import instaRoutes from './routes/InstaRoutes';

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('[mongoose] Connected to MongoDB'))
  .catch(() => console.log('[mongoose] Error connecting to MongoDB'));

const app = express();

app
  .use(bodyParser.json())
  .use(publicAlbumRoutes)
  .use(authenticationRoutes)
  .use(instaRoutes);

const authStrategy = passport.authenticate('authStrategy', { session: false });
app.use(authStrategy);

app.use(privateAlbumRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
