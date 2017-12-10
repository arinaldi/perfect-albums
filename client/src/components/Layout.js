import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import TopNavbar from './TopNavbar';
import Home from './Home';
import Albums from './Albums';
import Songs from './Songs';
import AotDContainer from '../containers/AotDContainer';
import CollectionContainer from '../containers/CollectionContainer';
import AdminContainer from '../containers/AdminContainer';
import NewAlbumContainer from '../containers/NewAlbumContainer';
import EditAlbumContainer from '../containers/EditAlbumContainer';
import DeleteAlbumContainer from '../containers/DeleteAlbumContainer'
import SignIn from '../components/SignIn';

const Layout = (props) => {
  const signIn = props.onSignIn;
  const error = props.error;
  const showAuthItems = props.showAuthItems;

  return (
    <Router>
      <div>
        <TopNavbar
          onSignOut={props.onSignOut}
          showAuthItems={props.showAuthItems}
        />

        <Route exact path="/" component={Home} />
        <Route path="/albums" component={Albums} />
        <Route path="/songs" component={Songs} />
        <Route path="/aotd" component={AotDContainer} />
        <Route path="/collection" component={CollectionContainer} />
        <Route path="/admin" render={props => (
          showAuthItems ?
            <AdminContainer /> :
              <Redirect to="/" />
        )} />
        <Route path="/new" component={NewAlbumContainer} />
        <Route path="/edit/:id" component={EditAlbumContainer} />
        <Route path="/delete/:id" component={DeleteAlbumContainer} />
        <Route path="/signin" render={props => (
          !showAuthItems ?
            <SignIn {...props} onSignIn={signIn} error={error} /> :
              <Redirect to="/" />
        )} />
      </div>
    </Router>
  );
};

export default Layout;
