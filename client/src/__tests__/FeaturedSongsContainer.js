import React from 'react';
import { render, wait } from '@testing-library/react';

import MyProvider from '../containers/MyProvider';
import FeaturedSongsContainer from '../containers/FeaturedSongs';

import { mockFeaturedSongsData } from '../__mocks__';
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

test('FeaturedSongsContainer handles successful data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(mockFeaturedSongsData),
  }));

  const { getByText, getByTestId } = render(
    <MyProvider>
      <FeaturedSongsContainer />
    </MyProvider>
  );
  const loader = getByText('Loading...');

  expect(loader).toBeInTheDocument();
  await wait(() => expect(getByTestId('card-row')).toBeInTheDocument());
  await wait(() => expect(getByTestId('card-row').children).toHaveLength(3));
});

test('FeaturedSongsContainer handles error from data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.reject(new Error('error message')));

  const { getByText } = render(
    <MyProvider>
      <FeaturedSongsContainer />
    </MyProvider>
  );
  const loader = getByText('Loading...');

  expect(loader).toBeInTheDocument();
  await wait(() => expect(getByText(MESSAGES.ERROR)).toBeInTheDocument());
});
