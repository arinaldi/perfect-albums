import React, { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';

const SubmitButton = ({ isDisabled, isLoading, text, loadingText }) => (
  <Button
    type='submit'
    variant='outline-dark'
    disabled={isDisabled}
  >
    {isLoading
      ? (
        <Fragment>
          <Spinner
            as='span'
            animation='border'
            size='sm'
            role='status'
            aria-hidden='true'
          />
          <span className='sr-only'>{loadingText}</span>
        </Fragment>
      )
      : `${text}`
    }
  </Button>
);

SubmitButton.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  loadingText: PropTypes.string,
};

SubmitButton.defaultProps = {
  loadingText: 'Loading...',
};

export default SubmitButton;
