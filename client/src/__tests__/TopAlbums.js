import React from 'react';
import { render } from 'react-testing-library';
import TopAlbums from '../components/TopAlbums';

const mockData = {
  '1991': [
    { artist: 'Nirvana', title: 'Nevermind' },
    { artist: 'Pearl Jam', title: 'Ten' },
  ],
  '1999': [
    { artist: 'HIM', title: 'Razorblade Romance' },
  ],
};

test('TopAlbums renders with data by year', () => {
  const { getByText, getByTestId } = render(<TopAlbums data={mockData} />);

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
