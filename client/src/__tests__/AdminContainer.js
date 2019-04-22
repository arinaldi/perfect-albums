import React from 'react';
import { render, wait } from 'react-testing-library';
import { createMemoryHistory } from 'history';

import AdminContainer from '../containers/Admin';

import { mockAdminData } from '../__mocks__';
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

const history = createMemoryHistory({
  initialEntries: [''],
});
const location = { search: '' };

test('AdminContainer handles successful data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.resolve(mockAdminData));

  const { getByText } = render(
    <AdminContainer history={history} location={location} />
  );
  const loader = getByText('Loading...');

  expect(loader).toBeInTheDocument();
  await wait(() => expect(getByText('Admin')).toBeInTheDocument());
  await wait(() => expect(getByText(mockAdminData.length.toString())).toBeInTheDocument());
  await wait(() => expect(getByText('Clear')).toBeInTheDocument());
  await wait(() => expect(getByText('New')).toBeInTheDocument());
});

test('AdminContainer handles error from data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.reject(new Error('error message')));

  const { getByText } = render(
    <AdminContainer history={history} location={location} />
  );
  const loader = getByText('Loading...');

  expect(loader).toBeInTheDocument();
  await wait(() => expect(getByText(MESSAGES.ERROR)).toBeInTheDocument());
});
