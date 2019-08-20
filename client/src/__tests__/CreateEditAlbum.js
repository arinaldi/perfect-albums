import React from 'react';
import { render } from '@testing-library/react';

import CreateEditAlbum from '../components/CreateEditAlbum/presenter';
import { mockAdminData } from '../__mocks__';

const { artist, title, year, cd, aotd, favorite } = mockAdminData[0];

test('CreateEditAlbum renders with data', () => {
  const { getByText, getByLabelText, container } = render(
    <CreateEditAlbum
      history={{}}
      album={mockAdminData[0]}
      header='Edit'
      handleChange={() => {}}
      handleRadioChange={() => {}}
      handleSubmit={() => {}}
    />
  );
  const titleHeader = getByText('Edit Album');
  const artistInput = getByLabelText('Artist');
  const titleInput = getByLabelText('Title');
  const yearInput = getByLabelText('Year');
  const cdInput = container.querySelector('input[name=cd][value=true]');
  const aotdInput = container.querySelector('input[name=aotd][value=true]');
  const favoriteInput = container.querySelector('input[name=favorite][value=true]');
  const cancelButton = getByText('Cancel');
  const saveButton = getByText('Save');

  expect(titleHeader).toBeInTheDocument();
  expect(artistInput.value).toBe(artist);
  expect(titleInput.value).toBe(title);
  expect(yearInput.value).toBe(year);
  expect(cdInput.checked).toBe(cd);
  expect(aotdInput.checked).toBe(aotd);
  expect(favoriteInput.checked).toBe(favorite);
  expect(cancelButton).toBeInTheDocument();
  expect(saveButton).toBeInTheDocument();
});
