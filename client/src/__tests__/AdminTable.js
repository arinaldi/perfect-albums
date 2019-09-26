import React from 'react';

import AdminTable from '../components/AdminTable/presenter';

import render from '../__test-utils__';
import { mockAdminData } from '../__mocks__';

test('AdminTable renders with data', () => {
  const { container, getByTestId } = render(
    <AdminTable
      data={mockAdminData}
      searchText=''
    />,
  );
  const firstRow = getByTestId('1');
  const secondRow = getByTestId('2');
  const thirdRow = getByTestId('3');
  const tbody = container.querySelector('tbody');

  expect(firstRow).toBeInTheDocument();
  expect(secondRow).toBeInTheDocument();
  expect(thirdRow).toBeInTheDocument();
  expect(tbody.children).toHaveLength(3);
});
