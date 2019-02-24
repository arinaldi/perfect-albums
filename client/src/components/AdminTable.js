import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AdminTableRow = ({ item }) => (
  <tr>
    <td>{item.artist}</td>
    <td>{item.album}</td>
    <td>{item.cd.toString()}</td>
    <td>{item.aotd.toString()}</td>
    <td>
      <Link to={`/edit/${item.id}`}>Edit</Link>
      &nbsp;|&nbsp;
      <Link to={`/delete/${item.id}`}>Delete</Link>
    </td>
  </tr>
);

AdminTableRow.propTypes = {
  item: PropTypes.object.isRequired,
};

const AdminTable = ({ data }) => (
  <Table striped hover>
    <thead>
      <tr>
        <th>Artist</th>
        <th>Album</th>
        <th>CD</th>
        <th>AotD</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map(item => (
        <AdminTableRow
          key={item.id}
          item={item}
        />
      ))}
    </tbody>
  </Table>
);

AdminTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AdminTable;
