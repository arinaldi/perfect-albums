import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { MyContext } from '../containers/MyProvider';

const AuthRoute = ({ ...props }) => {
  const { state } = useContext(MyContext);

  return (
    state.isAuthenticated
      ? <Route {...props} />
      : <Redirect to={{
        pathname: '/albums',
        state: { from: props.location },
      }} />
  );
}

export default AuthRoute;
