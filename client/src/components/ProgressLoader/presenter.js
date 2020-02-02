import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import PropTypes from 'prop-types';

const ProgressLoader = (props) => {
  const { isVisible } = props;
  const visibility = isVisible ? 'visible' : 'hidden';

  return (
    <ProgressBar
      animated
      now={100}
      style={{
        marginBottom: '10px',
        visibility,
      }}
    />
  );
};

ProgressLoader.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default ProgressLoader;
