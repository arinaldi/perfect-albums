import React from 'react';
import { render, wait } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import AdminContainer from '../components/Admin';

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

const history = createMemoryHistory({
  initialEntries: [''],
});
const location = { search: '' };

test('AdminContainer handles successful data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(mockAdminData),
  }));

  const { getByText, getAllByText } = render(
    <AdminContainer history={history} location={location} />
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
    <AdminContainer history={history} location={location} />
  );
  const loader = getByText('Loading...');

  expect(loader).toBeInTheDocument();
  await wait(() => expect(getByText(MESSAGES.ERROR)).toBeInTheDocument());
});
