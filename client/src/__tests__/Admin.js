import React from 'react';

import Admin from '../components/Admin/presenter';

import render from '../__test-utils__';
import { mockAdminData } from '../__mocks__';

test('Admin renders with data', () => {
  const { getByText } = render(
    <Admin
      searchText=''
      total={1500}
      filteredData={mockAdminData}
      searchInput={{ current: null }}
      handleChange={() => {}}
      clearInput={() => {}}
    />,
  );
  const titleHeader = getByText('Admin');
  const total = getByText('1,500');
  const resultsLength = getByText(mockAdminData.length.toString());
  const clearButton = getByText('Clear');
  const newButton = getByText('New');

  expect(titleHeader).toBeInTheDocument();
  expect(total).toBeInTheDocument();
  expect(resultsLength).toBeInTheDocument();
  expect(clearButton).toBeInTheDocument();
  expect(newButton).toBeInTheDocument();
});
