import React from 'react';

import CreateSongModalContainer from '../components/CreateSongModal';

import render from '../__test-utils__';

test('CreateSongModalContainer renders', async () => {
  const { getByText, getByLabelText, getAllByText } = render(
    <CreateSongModalContainer
      isOpen
      closeModal={() => {}}
      refresh={() => {}}
    />,
  );
  const titleHeader = getByText('Create Song');
  const artistInput = getByLabelText('Artist');
  const titleInput = getByLabelText('Title');
  const linkInput = getByLabelText('Link');
  const closeButtons = getAllByText('Close');
  const saveButton = getByText('Save');

  expect(titleHeader).toBeInTheDocument();
  expect(artistInput.value).toBe('');
  expect(titleInput.value).toBe('');
  expect(linkInput.value).toBe('');
  expect(closeButtons[0]).toBeInTheDocument();
  expect(closeButtons[1]).toBeInTheDocument();
  expect(saveButton).toBeInTheDocument();
});

test('CreateSongModalContainer does not render when closed', async () => {
  const { queryByText } = render(
    <CreateSongModalContainer
      isOpen={false}
      closeModal={() => {}}
      refresh={() => {}}
    />,
  );
  const titleHeader = queryByText('Create Song');

  expect(titleHeader).not.toBeInTheDocument();
});
