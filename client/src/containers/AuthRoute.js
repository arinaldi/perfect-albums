import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { MyConsumer } from '../containers/MyProvider';

const AuthRoute = ({ ...props }) => (
  <MyConsumer>
    {({ state }) => state.isAuthenticated
      ? <Route {...props} />
      : <Redirect to={{
        pathname: '/albums',
        state: { from: props.location },
      }} />
    }
  </MyConsumer>
);

export default AuthRoute;
