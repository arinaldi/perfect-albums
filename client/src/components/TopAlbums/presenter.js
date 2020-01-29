import React, { Fragment } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import { sortDesc } from '../../utils';
import AppMessage from '../AppMessage/presenter';
import AlbumCol from './AlbumCol';
import DecadeSelector from './DecadeSelector';
import TopLink from './TopLink';

const TopAlbums = ({ data, error }) => (
  <Fragment>
    <Container>
      <Row>
        <Col>
          <h3>Top Albums</h3>
        </Col>
        <Col xs='auto'>
          <DecadeSelector />
        </Col>
      </Row>
      {error && <AppMessage />}
      {!error && data && (
        <Row>
          {Object.keys(data).sort(sortDesc).map(year => (
            <AlbumCol
              key={year}
              data={data[year]}
              year={year}
              total={data[year].length}
            />
          ))}
        </Row>
      )}
    </Container>
    <TopLink />
  </Fragment>
);

TopAlbums.propTypes = {
  data: PropTypes.object,
  error: PropTypes.object,
};

export default TopAlbums;
