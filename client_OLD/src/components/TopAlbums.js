import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { sortByAlbum, sortDesc } from '../utils';

const AlbumCol = ({ data, year }) => (
  <Col xs={12} md={6} lg={4}>
    <h4>{year}</h4>
    <ul>
      {data[year].sort(sortByAlbum).map((album, index) => (
        <li key={index}>
          {album.artist} &ndash; {album.title}
        </li>
      ))}
    </ul>
  </Col>
);

AlbumCol.propTypes = {
  data: PropTypes.object.isRequired,
  year: PropTypes.string.isRequired,
};

const TopAlbums = ({ data }) => (
  <Container>
    <h3>Top Albums</h3>
    <Row>
      {Object.keys(data).sort(sortDesc).map(year => (
        <AlbumCol
          key={year}
          data={data}
          year={year}
        />
      ))}
    </Row>
  </Container>
);

TopAlbums.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TopAlbums;
