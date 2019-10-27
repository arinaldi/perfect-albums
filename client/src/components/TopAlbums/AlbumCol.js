import React from 'react';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

import { sortByAlbum } from '../../utils';

const AlbumCol = ({ data, year }) => (
  <Col xs={12} md={6} lg={4}>
    <h4 id={year}>{year}</h4>
    <ul data-testid={`list-${year}`}>
      {data.sort(sortByAlbum).map((album, index) => (
        <li key={index}>
          {album.artist} &ndash; {album.title}
        </li>
      ))}
    </ul>
  </Col>
);

AlbumCol.propTypes = {
  data: PropTypes.array.isRequired,
  year: PropTypes.string.isRequired,
};

export default AlbumCol;
