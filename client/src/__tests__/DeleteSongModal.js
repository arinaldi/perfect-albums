import React from 'react';
import { render } from 'react-testing-library';

import DeleteSongModal from '../components/DeleteSongModal';
import { mockFeaturedSongsData } from '../__mocks__';

const { artist, title } = mockFeaturedSongsData[0];

test('DeleteSongModal renders with data', () => {
  const { getByText, getAllByText } = render(
    <DeleteSongModal
      isOpen
      artist={artist}
      title={title}
      isDeleting={false}
      handleClose={() => {}}
      handleDelete={() => {}}
      error=''
    />
  );
  const titleHeader = getByText('Delete Song');
  const confirmText = getByText(`Are you sure you want to delete ${artist} – ${title}?`);
  const closeButtons = getAllByText('Close');
  const deleteButton = getByText('Delete');

  expect(titleHeader).toBeInTheDocument();
  expect(confirmText).toBeInTheDocument();
  expect(closeButtons[0]).toBeInTheDocument();
  expect(closeButtons[1]).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});
