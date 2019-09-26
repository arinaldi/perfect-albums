import React, { Fragment, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import NavBar from '../NavBar/presenter';
import ToastAlert from '../ToastAlert/presenter';
import Songs from '../Songs/presenter';
import Loader from '../Loader/presenter';

import { Context } from '../Provider';
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
    <Route path='/perfect-songs'><Songs /></Route>
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
  const { state: { isLoading } } = useContext(Context);

  return (
    <Router>
      <Fragment>
        <NavBar />
        <ToastAlert />
        {isLoading ? <Loader /> : <AppRoutes />}
      </Fragment>
    </Router>
  );
};

export default Routes;
