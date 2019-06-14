import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import NavBar from '../components/NavBar';
import ToastAlert from '../components/ToastAlert';
import Songs from '../components/Songs';
import Loader from '../components/Loader';

import { MyContext } from './MyProvider';
import SignIn from './SignIn';
import TopAlbums from './TopAlbums';
import FeaturedSongs from './FeaturedSongs';
import Admin from './Admin';
import CreateEditAlbum from './CreateEditAlbum';
import DeleteAlbum from './DeleteAlbum';
import AuthRoute from './AuthRoute';
import ErrorBoundary from './ErrorBoundary';

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
  const { state: { isLoading } } = useContext(MyContext);

  return (
    <Router>
      <ErrorBoundary>
        <NavBar />
        <ToastAlert />
        {isLoading ? <Loader /> : <AppRoutes />}
      </ErrorBoundary>
    </Router>
  );
};

export default Routes;
