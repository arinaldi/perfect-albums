import React from 'react';
import { Router } from 'react-router-dom';
import { render, wait } from 'react-testing-library';
import { createMemoryHistory } from 'history';

import MyProvider from '../containers/MyProvider';
import Routes from '../containers/Routes';

import { mockTopAlbumsData } from '../__mocks__';
import mockApi from '../utils/api';

jest.mock('../utils/api', () => {
  return {
    get: jest.fn(() => Promise.resolve(mockTopAlbumsData)),
  };
});

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  mockApi.get.mockClear();
});

test('Landing on a bad page redirects to albums', async () => {
  const history = createMemoryHistory({
    initialEntries: ['/something-that-does-not-match'],
  });
  const { getByTestId } = render(
    <MyProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </MyProvider>
  );

  await wait(() => expect(getByTestId('list-1991')).toBeInTheDocument());
  await wait(() => expect(getByTestId('list-1999')).toBeInTheDocument());
});
