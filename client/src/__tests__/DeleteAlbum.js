import React from 'react';
import { render } from 'react-testing-library';

import DeleteAlbum from '../components/DeleteAlbum';
import { mockAdminData } from '../__mocks__';

const { artist, title } = mockAdminData[0];

test('DeleteAlbum renders with data', () => {
  const { getByText } = render(
    <DeleteAlbum
      history={{}}
      artist={artist}
      title={title}
      handleSubmit={() => {}}
    />
  );
  const titleHeader = getByText('Delete Album');
  const confirmText = getByText(`Are you sure you want to delete ${artist} – ${title}?`);
  const cancelButton = getByText('Cancel');
  const deleteButton = getByText('Delete');

  expect(titleHeader).toBeInTheDocument();
  expect(confirmText).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});