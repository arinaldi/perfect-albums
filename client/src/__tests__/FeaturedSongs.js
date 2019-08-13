import React from 'react';
import { render } from '@testing-library/react';

import MyProvider from '../containers/MyProvider';
import FeaturedSongs from '../components/FeaturedSongs';

import { mockFeaturedSongsData } from '../__mocks__';

test('FeaturedSongs renders with data', () => {
  const { getByText, getByTestId } = render(
    <MyProvider>
      <FeaturedSongs
        data={mockFeaturedSongsData}
        handleCreateOpen={() => {}}
        handleDeleteOpen={() => {}}
      />
    </MyProvider>
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
