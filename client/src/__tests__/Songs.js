import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import { render } from 'react-testing-library';
import Songs from '../components/Songs';
import data from '../data/songs';

test('Songs renders with all data', () => {
  const { getByText, getByTestId } = render(<Songs />);

  const titleHeader = getByText('Perfect Songs');
  const tableBody = getByTestId('table-body');

  expect(titleHeader).toBeInTheDocument();
  expect(tableBody.children.length).toBe(data.songs.length);
});
