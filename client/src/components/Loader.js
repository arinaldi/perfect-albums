import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => (
  <div className='spinner'>
    <Spinner animation='border'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  </div>
);

export default Loader;
