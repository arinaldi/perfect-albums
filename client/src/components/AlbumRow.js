import React from 'react';
import { Link } from 'react-router-dom';

const AlbumRow = ({ data, searchText }) => (
  <tr>
    <td>{data.artist}</td>
    <td>{data.album}</td>
    <td>{data.cd.toString()}</td>
    <td>{data.aotd.toString()}</td>
    <td>
      <Link to={`/edit/${data._id}?${searchText}`}>Edit</Link>
      &nbsp;|&nbsp;
      <Link to={`/delete/${data._id}?${searchText}`}>Delete</Link>
    </td>
  </tr>
);

export default AlbumRow;
