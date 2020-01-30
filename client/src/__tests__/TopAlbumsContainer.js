import React from 'react';
import { render, wait } from '@testing-library/react';

import TopAlbumsContainer from '../components/TopAlbums';

import { mockTopAlbumsData } from '../__mocks__';
import mockApi from '../utils/api';
import { MESSAGES } from '../constants';

jest.mock('../utils/api', () => {
  return {
    get: jest.fn(),
  };
});

afterAll(() => {
  mockApi.get.mockClear();
});

test('TopAlbumsContainer handles successful data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(mockTopAlbumsData),
  }));

  const { getByTestId } = render(<TopAlbumsContainer />);

  await wait(() => expect(getByTestId('list-1991')).toBeInTheDocument());
  await wait(() => expect(getByTestId('list-1999')).toBeInTheDocument());
});

test('TopAlbumsContainer handles error from data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.reject(new Error('error message')));

  const { getByText } = render(<TopAlbumsContainer />);

  await wait(() => expect(getByText(MESSAGES.ERROR)).toBeInTheDocument());
});
