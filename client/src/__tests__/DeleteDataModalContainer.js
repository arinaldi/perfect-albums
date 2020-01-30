import React from 'react';

import { Context } from '../components/Provider';
import DeleteDataModalContainer from '../components/DeleteDataModal';

import render from '../__test-utils__';
import { mockFeaturedSongsData } from '../__mocks__';
import { MODAL_TYPES } from '../constants';

const { artist, title } = mockFeaturedSongsData[0];
const modal = {
  type: MODAL_TYPES.DATA_DELETE,
  data: {
    artist,
    title,
    dataType: 'Song',
    path: 'songs',
  },
  callback: jest.fn,
};
const renderModal = (modal) => (
  render(
    <Context.Provider value={{ state: { modal } }}>
      <DeleteDataModalContainer />
    </Context.Provider>,
  )
);

test('DeleteDataModalContainer renders with data', async () => {
  const { getByText } = renderModal({
    ...modal,
    isOpen: true,
  });
  const titleHeader = getByText('Delete Song');
  const confirmText = getByText(`Are you sure you want to delete ${artist} – ${title}?`);

  expect(titleHeader).toBeInTheDocument();
  expect(confirmText).toBeInTheDocument();
});

test('DeleteDataModalContainer does not render when closed', async () => {
  const { queryByText } = renderModal({
    ...modal,
    isOpen: false,
  });
  const titleHeader = queryByText('Delete Song');

  expect(titleHeader).not.toBeInTheDocument();
});
