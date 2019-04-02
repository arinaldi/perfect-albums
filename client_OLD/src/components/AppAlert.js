import React from 'react';
import { Alert } from 'react-bootstrap';

import { MyConsumer } from '../containers/MyProvider';

const AppAlert = () => (
  <MyConsumer>
    {({ state }) => {
      const alertClass = state.alert.isOpen ? 'alert-show' : 'alert-hide';

      return (
        <div className={`alert-container ${alertClass}`}>
          <Alert variant={state.alert.type}>{state.alert.message}</Alert>
        </div>
      );
    }}
  </MyConsumer>
);

export default AppAlert;
