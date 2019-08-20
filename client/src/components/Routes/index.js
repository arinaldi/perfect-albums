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
import Admin from '../Admin';
import CreateEditAlbum from '../CreateEditAlbum';
import DeleteAlbum from '../DeleteAlbum';
import AuthRoute from '../AuthRoute';

const AppRoutes = () => (
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
