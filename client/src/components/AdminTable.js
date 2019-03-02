import React from 'react';
import { Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AdminTableRow = ({ history, item }) => (
  <tr>
    <td>{item.artist}</td>
    <td>{item.title}</td>
    <td>{item.year}</td>
    <td>{item.cd.toString()}</td>
    <td>{item.aotd.toString()}</td>
    <td>
      <Button
        variant='outline-dark'
        onClick={() => history.push(`/edit/${item.id}`)}
      >
        Edit
      </Button>
      <Button
        variant='outline-dark'
        onClick={() => history.push(`/delete/${item.id}`)}
        style={{ marginLeft: 5 }}
      >
        Delete
      </Button>
    </td>
  </tr>
);

AdminTableRow.propTypes = {
  history: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};

const AdminTable = ({ history, data }) => (
  <Table striped hover>
    <thead>
      <tr>
        <th>Artist</th>
        <th>Title</th>
        <th>Year</th>
        <th>CD</th>
        <th>AotD</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map(item => (
        <AdminTableRow
          key={item.id}
          history={history}
          item={item}
        />
      ))}
    </tbody>
  </Table>
);

AdminTable.propTypes = {
  history: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default AdminTable;
