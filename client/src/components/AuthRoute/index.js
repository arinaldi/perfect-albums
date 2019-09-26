import React, { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Context } from '../Provider';

const AuthRoute = ({ children, ...props }) => {
  const { state } = useContext(Context);
  const location = useLocation();

  return (
    state.isAuthenticated
      ? <Route {...props}>{children}</Route>
      : <Redirect to={{
        pathname: '/albums',
        state: { from: location },
      }} />
  );
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRoute;
