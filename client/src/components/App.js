import React from 'react';

import ErrorBoundary from './ErrorBoundary';
import { Provider } from './Provider';
import Routes from './Routes';

import '../styles.css';

const App = () => (
  <ErrorBoundary>
    <Provider>
      <Routes />
    </Provider>
  </ErrorBoundary>
);

export default App;
