import React from 'react';
import { Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ICONS } from '../constants';

const { CHECK } = ICONS;

const AdminTableRow = ({ history, item, searchText }) => (
  <tr>
    <td>{item.artist}</td>
    <td>{item.title}</td>
    <td>{item.year}</td>
    <td>{item.cd && CHECK}</td>
    <td>{item.aotd && CHECK}</td>
    <td>{item.favorite && CHECK}</td>
    <td>
      <Button
        variant='outline-dark'
        size='sm'
        onClick={() => history.push(`/edit/${item.id}?${searchText}`)}
      >
        Edit
      </Button>
      <Button
        variant='outline-dark'
        size='sm'
        onClick={() => history.push(`/delete/${item.id}?${searchText}`)}
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
  searchText: PropTypes.string,
};

AdminTableRow.defaultProps = {
  searchText: '',
};

const AdminTable = ({ history, data, searchText }) => (
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
          history={history}
          item={item}
          searchText={searchText}
        />
      ))}
    </tbody>
  </Table>
);

AdminTable.propTypes = {
  history: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  searchText: PropTypes.string,
};

AdminTable.defaultProps = {
  searchText: '',
};

export default AdminTable;
