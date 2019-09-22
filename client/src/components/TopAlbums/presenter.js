import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import { sortDesc } from '../../utils';
import AlbumCol from './AlbumCol';

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
