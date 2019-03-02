import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import NavBar from '../components/NavBar';
import AppAlert from '../components/AppAlert';
import SignIn from '../components/SignIn';
import Songs from '../components/Songs';
import TopAlbums from './TopAlbums';
import Admin from './Admin';
import CreateEditAlbum from './CreateEditAlbum';
import DeleteAlbum from './DeleteAlbum';
import AuthRoute from './AuthRoute';

const Routes = ({
  signIn,
  signOut,
  clearError,
  error,
  isAuthenticated,
  alert,
  showAlert,
}) => (
  <Router>
    <Fragment>
      <NavBar
        signOut={signOut}
        isAuthenticated={isAuthenticated}
      />
      <AppAlert alert={alert} />
      <Switch>
        <Route path='/albums' component={TopAlbums} />
        <Route path='/songs' component={Songs} />
        <AuthRoute
          path='/admin'
          isAuthenticated={isAuthenticated}
          render={props => <Admin {...props} />}
        />
        <AuthRoute
          path='/new'
          isAuthenticated={isAuthenticated}
          render={props => (
            <CreateEditAlbum
              {...props}
              showAlert={showAlert}
              signOut={signOut}
            />
          )}
        />
        <AuthRoute
          path='/edit/:id'
          isAuthenticated={isAuthenticated}
          render={props => (
            <CreateEditAlbum
              {...props}
              showAlert={showAlert}
              signOut={signOut}
            />
          )}
        />
        <AuthRoute
          path='/delete/:id'
          isAuthenticated={isAuthenticated}
          render={props => (
            <DeleteAlbum
              {...props}
              showAlert={showAlert}
              signOut={signOut}
            />
          )}
        />
        <Route path='/signin' render={props => (
          isAuthenticated
            ? <Redirect to='/admin' />
            : <SignIn
              {...props}
              signIn={signIn}
              clearError={clearError}
              error={error}
              />
        )} />
        <Route render={() => <Redirect to='/albums' />} />
        </Switch>
    </Fragment>
  </Router>
);

Routes.propTypes = {
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  alert: PropTypes.object.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default Routes;
