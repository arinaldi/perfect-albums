import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminTableRow = ({ item }) => (
  <tr>
    <td>{item.artist}</td>
    <td>{item.album}</td>
    <td>{item.cd.toString()}</td>
    <td>{item.aotd.toString()}</td>
    <td>
      <Link to={`/edit/${item._id}`}>Edit</Link>
      &nbsp;|&nbsp;
      <Link to={`/delete/${item._id}`}>Delete</Link>
    </td>
  </tr>
);

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
          key={item._id}
          item={item}
        />
      ))}
    </tbody>
  </Table>
);

export default AdminTable;
