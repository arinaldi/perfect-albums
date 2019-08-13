import React from 'react';
import { render } from '@testing-library/react';

import CreateSongModalContainer from '../containers/CreateSongModal';
import MyProvider from '../containers/MyProvider';

test('CreateSongModalContainer renders', async () => {
  const { getByText, getByLabelText, getAllByText } = render(
    <MyProvider>
      <CreateSongModalContainer
        isOpen
        closeModal={() => {}}
        refresh={() => {}}
      />
    </MyProvider>
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
    <MyProvider>
      <CreateSongModalContainer
        isOpen={false}
        closeModal={() => {}}
        refresh={() => {}}
      />
    </MyProvider>
  );
  const titleHeader = queryByText('Delete Song');

  expect(titleHeader).not.toBeInTheDocument();
});
