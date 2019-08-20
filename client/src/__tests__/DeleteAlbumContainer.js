import React from 'react';
import { render, wait } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import DeleteAlbumContainer from '../components/DeleteAlbum';
import Provider from '../components/Provider';

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
const match = { params: { id: '1' } };
const { artist, title } = mockAdminData[0];

test('DeleteAlbumContainer handles successful data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.resolve({
    status: 200,
    json: () => Promise.resolve(mockAdminData[0]),
  }));

  const { getByText } = render(
    <Provider>
      <DeleteAlbumContainer
        history={history}
        location={location}
        match={match}
      />
    </Provider>
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
    <Provider>
      <DeleteAlbumContainer
        history={history}
        location={location}
        match={match}
      />
    </Provider>
  );
  const loader = getByText('Loading...');

  expect(loader).toBeInTheDocument();
  await wait(() => expect(container.querySelector('.alert-container')).toBeInTheDocument());
  await wait(() => expect(getByText(MESSAGES.ERROR)).toBeInTheDocument());
});
