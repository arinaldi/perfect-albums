import React from 'react';

import { Context } from '../components/Provider';
import CreateReleaseModalContainer from '../components/CreateReleaseModal';

import render from '../__test-utils__';
import { MODAL_TYPES } from '../constants';

const modal = {
  type: MODAL_TYPES.NEW_RELEASE_CREATE,
  callback: jest.fn,
};
const renderModal = (modal) => (
  render(
    <Context.Provider value={{ state: { modal } }}>
      <CreateReleaseModalContainer />
    </Context.Provider>,
  )
);

test('CreateReleaseModalContainer renders', async () => {
  const { getByText, getByLabelText, getAllByText } = renderModal({
    ...modal,
    isOpen: true,
  });
  const titleHeader = getByText('Create Release');
  const artistInput = getByLabelText('Artist');
  const titleInput = getByLabelText('Title');
  const linkInput = getByLabelText('Date');
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

test('CreateReleaseModalContainer does not render when closed', async () => {
  const { queryByText } = renderModal({
    ...modal,
    isOpen: false,
  });
  const titleHeader = queryByText('Create Release');

  expect(titleHeader).not.toBeInTheDocument();
});
