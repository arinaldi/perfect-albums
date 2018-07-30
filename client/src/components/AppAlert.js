import React from 'react';
import { Alert } from 'react-bootstrap';

const AppAlert = ({ alert }) => {
  const alertClass = alert.isOpen ? 'alert-show' : 'alert-hide';

  return (
    <div className={`alert-container ${alertClass}`}>
      <Alert bsClass="alert" bsStyle={alert.type}>{alert.message}</Alert>
    </div>
  );
};

export default AppAlert;
