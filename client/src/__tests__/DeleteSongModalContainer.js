import React from 'react';
import { render } from '@testing-library/react';

import DeleteSongModalContainer from '../components/DeleteSongModal';
import Provider from '../components/Provider';

import { mockFeaturedSongsData } from '../__mocks__';

const { artist, title } = mockFeaturedSongsData[0];

test('DeleteSongModalContainer renders with data', async () => {
  const { getByText } = render(
    <Provider>
      <DeleteSongModalContainer
        isOpen
        closeModal={() => {}}
        activeSong={mockFeaturedSongsData[0]}
        refresh={() => {}}
      />
    </Provider>
  );
  const titleHeader = getByText('Delete Song');
  const confirmText = getByText(`Are you sure you want to delete ${artist} – ${title}?`);

  expect(titleHeader).toBeInTheDocument();
  expect(confirmText).toBeInTheDocument();
});

test('DeleteSongModalContainer does not render when closed', async () => {
  const { queryByText } = render(
    <Provider>
      <DeleteSongModalContainer
        isOpen={false}
        closeModal={() => {}}
        activeSong={mockFeaturedSongsData[0]}
        refresh={() => {}}
      />
    </Provider>
  );
  const titleHeader = queryByText('Delete Song');

  expect(titleHeader).not.toBeInTheDocument();
});
