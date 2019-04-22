import React from 'react';
import { render, wait } from 'react-testing-library';

import TopAlbumsContainer from '../containers/TopAlbums';

import { mockTopAlbumsData } from '../__mocks__';
import mockApi from '../utils/api';
import { MESSAGES } from '../constants';

jest.mock('../utils/api', () => {
  return {
    get: jest.fn(),
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

test('TopAlbumsContainer handles successful data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.resolve(mockTopAlbumsData));

  const { getByText, getByTestId } = render(<TopAlbumsContainer />);
  const loader = getByText('Loading...');

  expect(loader).toBeInTheDocument();
  await wait(() => expect(getByTestId('list-1991')).toBeInTheDocument());
  await wait(() => expect(getByTestId('list-1999')).toBeInTheDocument());
});

test('TopAlbumsContainer handles error from data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.reject(new Error('error message')));

  const { getByText } = render(<TopAlbumsContainer />);
  const loader = getByText('Loading...');

  expect(loader).toBeInTheDocument();
  await wait(() => expect(getByText(MESSAGES.ERROR)).toBeInTheDocument());
});
