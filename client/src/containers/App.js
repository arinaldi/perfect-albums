import React from 'react';

import ErrorBoundary from './ErrorBoundary';
import MyProvider from './MyProvider';
import Routes from './Routes';

import '../styles.css';

const App = () => (
  <ErrorBoundary>
    <MyProvider>
      <Routes />
    </MyProvider>
  </ErrorBoundary>
);

export default App;
