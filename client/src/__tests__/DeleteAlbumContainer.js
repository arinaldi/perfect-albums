import React from 'react';
import { render, wait } from 'react-testing-library';
import { createMemoryHistory } from 'history';

import DeleteAlbumContainer from '../containers/DeleteAlbum';
import MyProvider from '../containers/MyProvider';

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
const match = { params: { id: '1' } };
const { artist, title } = mockAdminData[0];

test('DeleteAlbumContainer handles successful data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.resolve({
    status: 200,
    json: () => Promise.resolve(mockAdminData[0]),
  }));

  const { getByText } = render(
    <MyProvider>
      <DeleteAlbumContainer
        history={history}
        location={location}
        match={match}
      />
    </MyProvider>
  );
  const loader = getByText('Loading...');

  expect(loader).toBeInTheDocument();
  await wait(() => expect(getByText('Delete Album')).toBeInTheDocument());
  await wait(() => expect(getByText(`Are you sure you want to delete ${artist} – ${title}?`)).toBeInTheDocument());
  await wait(() => expect(getByText('Cancel')).toBeInTheDocument());
  await wait(() => expect(getByText('Delete')).toBeInTheDocument());
});

test('DeleteAlbumContainer handles error from data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.reject(new Error(MESSAGES.ERROR)));

  const { getByText, container } = render(
    <MyProvider>
      <DeleteAlbumContainer
        history={history}
        location={location}
        match={match}
      />
    </MyProvider>
  );
  const loader = getByText('Loading...');

  expect(loader).toBeInTheDocument();
  await wait(() => expect(container.querySelector('.alert-container')).toBeInTheDocument());
  await wait(() => expect(getByText(MESSAGES.ERROR)).toBeInTheDocument());
});
