import React from 'react';
import { wait } from '@testing-library/react';

import NewReleasesContainer from '../components/NewReleases';

import render from '../__test-utils__';
import { mockNewReleasesData, releaseLabels } from '../__mocks__';
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

test('NewReleasesContainer handles successful data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(mockNewReleasesData),
  }));

  const { getByTestId } = render(
    <NewReleasesContainer />,
  );

  await wait(() => expect(getByTestId(`list-${releaseLabels.one}`)).toBeInTheDocument());
  await wait(() => expect(getByTestId(`list-${releaseLabels.two}`)).toBeInTheDocument());
});

test('NewReleasesContainer handles error from data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.reject(new Error('error message')));

  const { getByText } = render(
    <NewReleasesContainer />,
  );

  await wait(() => expect(getByText(MESSAGES.ERROR)).toBeInTheDocument());
});
