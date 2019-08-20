import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import { sortByAlbum, sortDesc } from '../../utils';

const AlbumCol = ({ data, year }) => (
  <Col xs={12} md={6} lg={4}>
    <h4>{year}</h4>
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

const TopAlbums = ({ data }) => (
  <Container>
    <h3>Top Albums</h3>
    <Row>
      {Object.keys(data).sort(sortDesc).map(year => (
        <AlbumCol
          key={year}
          data={data[year]}
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