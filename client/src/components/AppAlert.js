import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AppAlert = ({ alert }) => {
  const alertClass = alert.isOpen ? 'alert-show' : 'alert-hide';

  return (
    <div className={`alert-container ${alertClass}`}>
      <Alert variant={alert.type}>{alert.message}</Alert>
    </div>
  );
};

AppAlert.propTypes = {
  alert: PropTypes.object.isRequired,
};

export default AppAlert;
