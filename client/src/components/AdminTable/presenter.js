import React from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';

import AdminTableRow from './AdminTableRow';

const AdminTable = ({ data, searchText }) => (
  <Table responsive striped hover size='sm'>
    <thead>
      <tr>
        <th>Artist</th>
        <th>Title</th>
        <th>Year</th>
        <th>CD</th>
        <th>AotD</th>
        <th>Favorite</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map(item => (
        <AdminTableRow
          key={item.id}
          item={item}
          searchText={searchText}
        />
      ))}
    </tbody>
  </Table>
);

AdminTable.propTypes = {
  data: PropTypes.array.isRequired,
  searchText: PropTypes.string,
};

AdminTable.defaultProps = {
  searchText: '',
};

export default AdminTable;
