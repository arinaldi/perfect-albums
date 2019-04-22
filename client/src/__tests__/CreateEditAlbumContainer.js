import React from 'react';
import { render, wait } from 'react-testing-library';
import { createMemoryHistory } from 'history';

import CreateEditAlbumContainer from '../containers/CreateEditAlbum';
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
const match = {
  params: { id: '1' },
  path: '/edit',
};
const { artist, title, year, cd, aotd, favorite } = mockAdminData[0];

test('CreateEditAlbumContainer handles successful data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.resolve(mockAdminData[0]));

  const { getByText, getByLabelText, container } = render(
    <MyProvider>
      <CreateEditAlbumContainer
        history={history}
        location={location}
        match={match}
      />
    </MyProvider>
  );
  const loader = getByText('Loading...');

  expect(loader).toBeInTheDocument();
  await wait(() => expect(getByText('Edit Album')).toBeInTheDocument());
  await wait(() => expect(getByLabelText('Artist').value).toBe(artist));
  await wait(() => expect(getByLabelText('Title').value).toBe(title));
  await wait(() => expect(getByLabelText('Year').value).toBe(year));
  await wait(() => expect(container.querySelector('input[name=cd][value=true]').checked).toBe(cd));
  await wait(() => expect(container.querySelector('input[name=aotd][value=true]').checked).toBe(aotd));
  await wait(() => expect(container.querySelector('input[name=favorite][value=true]').checked).toBe(favorite));
  await wait(() => expect(getByText('Cancel')).toBeInTheDocument());
  await wait(() => expect(getByText('Save')).toBeInTheDocument());
});

test('CreateEditAlbumContainer handles error from data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.reject(new Error(MESSAGES.ERROR)));

  const { getByText, container } = render(
    <MyProvider>
      <CreateEditAlbumContainer
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
