import React from 'react';
import { wait } from '@testing-library/react';

import AdminContainer from '../components/Admin';

import render from '../__test-utils__';
import { mockAdminData } from '../__mocks__';
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

test('AdminContainer handles successful data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(mockAdminData),
  }));

  const { getByText, getAllByText } = render(
    <AdminContainer />,
  );
  const loader = getByText('Loading...');

  expect(loader).toBeInTheDocument();
  await wait(() => expect(getByText('Admin')).toBeInTheDocument());
  await wait(() => {
    const [badge1, badge2] = getAllByText(mockAdminData.length.toString());
    expect(badge1).toBeInTheDocument();
    expect(badge2).toBeInTheDocument();
  });
  await wait(() => expect(getByText('Clear')).toBeInTheDocument());
  await wait(() => expect(getByText('New')).toBeInTheDocument());
});

test('AdminContainer handles error from data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.reject(new Error('error message')));

  const { getByText } = render(
    <AdminContainer />,
  );
  const loader = getByText('Loading...');

  expect(loader).toBeInTheDocument();
  await wait(() => expect(getByText(MESSAGES.ERROR)).toBeInTheDocument());
});
