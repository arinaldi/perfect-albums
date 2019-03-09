import React from 'react';

import MyProvider from './MyProvider';
import Routes from './Routes';
import '../styles.css';

const App = () => (
  <MyProvider>
    <Routes />
  </MyProvider>
);

export default App;
