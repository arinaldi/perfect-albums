import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import store from './store';
import { Provider } from 'react-redux';

const oldFetch = window.fetch;
window.fetch = function fetch(url, settings) {
  const headers = Object.assign(settings ? settings.headers : {},
  {authorization: localStorage.getItem('token')});
  settings = settings || {};
  settings.headers = headers;
  return oldFetch(url, settings);
};

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
