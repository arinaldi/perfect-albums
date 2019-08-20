import React from 'react';
import { render } from '@testing-library/react';

import Provider from '../components/Provider';
import FeaturedSongs from '../components/FeaturedSongs/presenter';

import { mockFeaturedSongsData } from '../__mocks__';

test('FeaturedSongs renders with data', () => {
  const { getByText, getByTestId } = render(
    <Provider>
      <FeaturedSongs
        data={mockFeaturedSongsData}
        handleCreateOpen={() => {}}
        handleDeleteOpen={() => {}}
      />
    </Provider>
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
