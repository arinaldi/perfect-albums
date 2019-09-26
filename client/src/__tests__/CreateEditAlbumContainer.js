import React from 'react';
import { wait } from '@testing-library/react';

import CreateEditAlbumContainer from '../components/CreateEditAlbum';

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

const { id, artist, title, year, cd, aotd, favorite } = mockAdminData[0];

test('CreateEditAlbumContainer handles successful data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.resolve({
    status: 200,
    json: () => Promise.resolve(mockAdminData[0]),
  }));

  const { getByText, getByLabelText, container } = render(
    <CreateEditAlbumContainer />,
    `/edit/${id}`,
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
    <CreateEditAlbumContainer />,
    `/edit/${id}`,
  );
  const loader = getByText('Loading...');

  expect(loader).toBeInTheDocument();
  await wait(() => expect(container.querySelector('.alert-container')).toBeInTheDocument());
  await wait(() => expect(getByText(MESSAGES.ERROR)).toBeInTheDocument());
});
