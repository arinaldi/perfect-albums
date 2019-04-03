import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => (
  <div className='spinner'>
    <Spinner animation='border'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  </div>
);

export default Loader;
