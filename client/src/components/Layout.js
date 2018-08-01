import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import TopNavbar from './TopNavbar';
import Home from './Home';
import Albums from './Albums';
import Songs from './Songs';
import AotD from '../containers/AotD';
import Collection from '../containers/Collection';
import Admin from '../containers/Admin';
import Album from '../containers/Album';
import DeleteAlbum from '../containers/DeleteAlbum';
import AppAlert from '../containers/AppAlert';
import SignIn from '../components/SignIn';

const Layout = ({ onSignIn, onSignOut, clearError, error, showAuthItems }) => (
  <Router>
    <div>
      <TopNavbar
        onSignOut={onSignOut}
        showAuthItems={showAuthItems}
      />
      <AppAlert />
      <Route exact path="/" component={Home} />
      <Route path="/albums" component={Albums} />
      <Route path="/songs" component={Songs} />
      <Route path="/aotd" component={AotD} />
      <Route path="/collection" component={Collection} />
      <Route path="/admin" render={props => (
        showAuthItems ?
          <Admin {...props} /> :
            <Redirect to="/" />
      )} />
      <Route path="/new" component={Album} />
      <Route path="/edit/:id" component={Album} />
      <Route path="/delete/:id" component={DeleteAlbum} />
      <Route path="/signin" render={props => (
        !showAuthItems ?
          <SignIn {...props} onSignIn={onSignIn} clearError={clearError} error={error} /> :
            <Redirect to="/" />
      )} />
    </div>
  </Router>
);

export default Layout;
