import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => (
  <div className='alert-container'>
    <Alert variant='danger'>{message}</Alert>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

ErrorMessage.defaultProps = {
  message: 'Something went wrong',
};

export default ErrorMessage;
