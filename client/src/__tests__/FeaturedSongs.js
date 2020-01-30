import React from 'react';

import FeaturedSongs from '../components/FeaturedSongs/presenter';

import render from '../__test-utils__';
import { mockFeaturedSongsData } from '../__mocks__';

test('FeaturedSongs renders with data', () => {
  const { getByText, getByTestId } = render(
    <FeaturedSongs
      data={mockFeaturedSongsData}
      handleCreateOpen={jest.fn}
      handleDeleteOpen={jest.fn}
    />,
  );
  const titleHeader = getByText('Featured Songs');
  const nirvanaCard = getByText('Smells Like Teen Spirit');
  const pearlJamCard = getByText('Even Flow');
  const cardRow = getByTestId('card-row');

  expect(titleHeader).toBeInTheDocument();
  expect(nirvanaCard).toBeInTheDocument();
  expect(pearlJamCard).toBeInTheDocument();
  expect(cardRow.children).toHaveLength(3);
});
