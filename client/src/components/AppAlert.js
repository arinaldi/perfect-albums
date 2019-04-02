import React, { useContext } from 'react';
import { Alert } from 'react-bootstrap';

import { MyContext } from '../containers/MyProvider';

const AppAlert = () => {
  const { state } = useContext(MyContext);
  const alertClass = state.alert.isOpen ? 'alert-show' : 'alert-hide';

  return (
    <div className={`alert-container ${alertClass}`}>
      <Alert variant={state.alert.type}>{state.alert.message}</Alert>
    </div>
  );
};

export default AppAlert;
