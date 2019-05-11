import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import NavBar from '../components/NavBar';
import AppAlert from '../components/AppAlert';
import ToastAlert from '../components/ToastAlert';
import Songs from '../components/Songs';

import SignIn from './SignIn';
import TopAlbums from './TopAlbums';
import FeaturedSongs from './FeaturedSongs';
import Admin from './Admin';
import CreateEditAlbum from './CreateEditAlbum';
import DeleteAlbum from './DeleteAlbum';
import AuthRoute from './AuthRoute';

const Routes = () => (
  <Router>
    <Fragment>
      <NavBar />
      <AppAlert />
      <ToastAlert />
      <Switch>
        <Route path='/albums' component={TopAlbums} />
        <Route path='/perfect-songs' component={Songs} />
        <Route path='/featured-songs' component={FeaturedSongs} />
        <AuthRoute path='/admin' component={Admin} />
        <AuthRoute path='/new' component={CreateEditAlbum} />
        <AuthRoute path='/edit/:id' component={CreateEditAlbum} />
        <AuthRoute path='/delete/:id' component={DeleteAlbum} />
        <Route path='/signin' component={SignIn} />
        <Route render={() => <Redirect to='/albums' />} />
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
