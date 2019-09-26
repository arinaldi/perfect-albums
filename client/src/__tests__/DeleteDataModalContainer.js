import React from 'react';

import DeleteDataModalContainer from '../components/DeleteDataModal';

import render from '../__test-utils__';
import { mockFeaturedSongsData } from '../__mocks__';

const { artist, title } = mockFeaturedSongsData[0];

test('DeleteDataModalContainer renders with data', async () => {
  const { getByText } = render(
    <DeleteDataModalContainer
      isOpen
      dataType='Song'
      closeModal={() => {}}
      path='song'
      data={mockFeaturedSongsData[0]}
      refresh={() => {}}
    />,
  );
  const titleHeader = getByText('Delete Song');
  const confirmText = getByText(`Are you sure you want to delete ${artist} – ${title}?`);

  expect(titleHeader).toBeInTheDocument();
  expect(confirmText).toBeInTheDocument();
});

test('DeleteDataModalContainer does not render when closed', async () => {
  const { queryByText } = render(
    <DeleteDataModalContainer
      isOpen={false}
      dataType='Song'
      closeModal={() => {}}
      path='song'
      data={mockFeaturedSongsData[0]}
      refresh={() => {}}
    />,
  );
  const titleHeader = queryByText('Delete Song');

  expect(titleHeader).not.toBeInTheDocument();
});
