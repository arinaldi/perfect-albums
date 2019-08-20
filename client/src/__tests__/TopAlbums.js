import React from 'react';
import { render } from '@testing-library/react';

import TopAlbums from '../components/TopAlbums/presenter';
import { mockTopAlbumsData } from '../__mocks__';

test('TopAlbums renders with data by year', () => {
  const { getByText, getByTestId } = render(<TopAlbums data={mockTopAlbumsData} />);
  const titleHeader = getByText('Top Albums');
  const year91Header = getByText('1991');
  const year99Header = getByText('1999');
  const year91List = getByTestId('list-1991');
  const year99List = getByTestId('list-1999');

  expect(titleHeader).toBeInTheDocument();
  expect(year91Header).toBeInTheDocument();
  expect(year99Header).toBeInTheDocument();
  expect(year91List.children).toHaveLength(2);
  expect(year99List.children).toHaveLength(1);
});
