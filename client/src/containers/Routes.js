import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import TopNavbar from '../components/TopNavbar';
import AppAlert from '../components/AppAlert';
import Albums from '../components/Albums';
import Songs from '../components/Songs';
import SignIn from '../components/SignIn';
import Admin from './Admin';
import CreateEditAlbum from './CreateEditAlbum';
import DeleteAlbum from './DeleteAlbum';

const Routes = ({
  onSignIn,
  onSignOut,
  clearError,
  error,
  showAuthItems,
  alert,
  showAlert,
}) => (
  <Router>
    <Fragment>
      <TopNavbar
        onSignOut={onSignOut}
        showAuthItems={showAuthItems}
      />
      <AppAlert alert={alert} />
      <Switch>
        <Route path="/albums" component={Albums} />
        <Route path="/songs" component={Songs} />
        <Route path="/admin" render={props => (
          showAuthItems ?
            <Admin {...props} /> :
              <Redirect to="/albums" />
        )} />
        <Route path="/new" render={props => (
          <CreateEditAlbum
            {...props}
            showAlert={showAlert}
          />
        )} />
        <Route path="/edit/:id" render={props => (
          <CreateEditAlbum
            {...props}
            showAlert={showAlert}
          />
        )} />
        <Route path="/delete/:id" render={props => (
          <DeleteAlbum
            {...props}
            showAlert={showAlert}
          />
        )} />
        <Route path="/signin" render={props => (
          !showAuthItems
            ? <SignIn {...props} onSignIn={onSignIn} clearError={clearError} error={error} />
            : <Redirect to="/albums" />
        )} />
        <Route render={() => <Redirect to="/albums" />} />
        </Switch>
    </Fragment>
  </Router>
);

export default Routes;
