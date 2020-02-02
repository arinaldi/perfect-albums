import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import NavBar from '../NavBar/presenter';
import ToastAlert from '../ToastAlert/presenter';
import ModalContainer from '../ModalContainer';
import PerfectSongs from '../PerfectSongs/presenter';
import SignIn from '../SignIn';
import TopAlbums from '../TopAlbums';
import FeaturedSongs from '../FeaturedSongs';
import NewReleases from '../NewReleases';
import Admin from '../Admin';
import CreateEditAlbum from '../CreateEditAlbum';
import DeleteAlbum from '../DeleteAlbum';
import AuthRoute from '../AuthRoute';

const AppRoutes = () => (
  <Switch>
    <Route path='/albums'><TopAlbums /></Route>
    <Route path='/perfect-songs'><PerfectSongs /></Route>
    <Route path='/featured-songs'><FeaturedSongs /></Route>
    <Route path='/new-releases'><NewReleases /></Route>
    <AuthRoute path='/admin'><Admin /></AuthRoute>
    <AuthRoute path='/new'><CreateEditAlbum /></AuthRoute>
    <AuthRoute path='/edit/:id'><CreateEditAlbum /></AuthRoute>
    <AuthRoute path='/delete/:id'><DeleteAlbum /></AuthRoute>
    <Route path='/signin'><SignIn /></Route>
    <Route><Redirect to='/albums' /></Route>
  </Switch>
);

const Routes = () => {
  return (
    <Router>
      <Fragment>
        <NavBar />
        <ToastAlert />
        <ModalContainer />
        <AppRoutes />
      </Fragment>
    </Router>
  );
};

export default Routes;
