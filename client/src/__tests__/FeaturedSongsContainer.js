import React from 'react';
import { wait } from '@testing-library/react';

import FeaturedSongsContainer from '../components/FeaturedSongs';

import render from '../__test-utils__';
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

  const { getByTestId } = render(
    <FeaturedSongsContainer />,
  );

  await wait(() => expect(getByTestId('card-row')).toBeInTheDocument());
  await wait(() => expect(getByTestId('card-row').children).toHaveLength(3));
});

test('FeaturedSongsContainer handles error from data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.reject(new Error('error message')));

  const { getByText } = render(
    <FeaturedSongsContainer />,
  );

  await wait(() => expect(getByText(MESSAGES.ERROR)).toBeInTheDocument());
});
