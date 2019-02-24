import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthRoute = ({ isAuthenticated, ...props }) => (
  isAuthenticated
    ? <Route {...props} />
    : <Redirect to={{
      pathname: '/albums',
      state: { from: props.location },
    }} />
);

AuthRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default AuthRoute;
