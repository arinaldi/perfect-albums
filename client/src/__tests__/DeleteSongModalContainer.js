import React from 'react';
import { render } from 'react-testing-library';

import DeleteSongModalContainer from '../containers/DeleteSongModal';
import MyProvider from '../containers/MyProvider';

import { mockFeaturedSongsData } from '../__mocks__';

const { artist, title } = mockFeaturedSongsData[0];

test('DeleteSongModalContainer renders with data', async () => {
  const { getByText } = render(
    <MyProvider>
      <DeleteSongModalContainer
        isOpen
        setIsOpen={() => {}}
        activeSong={mockFeaturedSongsData[0]}
        refresh={() => {}}
      />
    </MyProvider>
  );
  const titleHeader = getByText('Delete Song');
  const confirmText = getByText(`Are you sure you want to delete ${artist} – ${title}?`);

  expect(titleHeader).toBeInTheDocument();
  expect(confirmText).toBeInTheDocument();
});

test('DeleteSongModalContainer does not render when closed', async () => {
  const { queryByText } = render(
    <MyProvider>
      <DeleteSongModalContainer
        isOpen={false}
        setIsOpen={() => {}}
        activeSong={mockFeaturedSongsData[0]}
        refresh={() => {}}
      />
    </MyProvider>
  );
  const titleHeader = queryByText('Delete Song');

  expect(titleHeader).not.toBeInTheDocument();
});
