import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { ALERT_TYPES, MESSAGES } from '../constants';

const AppMessage = ({ type, message }) => (
  <div className='alert-container'>
    <Alert variant={type}>{message}</Alert>
  </div>
);

AppMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

AppMessage.defaultProps = {
  type: ALERT_TYPES.ERROR,
  message: MESSAGES.ERROR,
};

export default AppMessage;
