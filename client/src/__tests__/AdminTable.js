import React from 'react';
import { render } from '@testing-library/react';

import AdminTable from '../components/AdminTable';
import { mockAdminData } from '../__mocks__';

test('AdminTable renders with data', () => {
  const { container, getByTestId } = render(
    <AdminTable
      history={{}}
      data={mockAdminData}
      searchText=''
    />
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
