import React from 'react';
import { render } from '@testing-library/react';

import Songs from '../components/Songs/presenter';
import data from '../data/songs';

test('Songs renders with all data', () => {
  const { getByText, getByTestId } = render(<Songs />);
  const titleHeader = getByText('Perfect Songs');
  const tableBody = getByTestId('table-body');

  expect(titleHeader).toBeInTheDocument();
  expect(tableBody.children.length).toBe(data.songs.length);
});
