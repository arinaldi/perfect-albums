import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import { Context } from '../Provider';
import AppMessage from '../AppMessage/presenter';
import CardWrapper from './CardWrapper';

const FeaturedSongs = (props) => {
  const {
    data,
    error,
    handleCreateOpen,
    handleDeleteOpen,
  } = props;
  const { state: { isAuthenticated } } = useContext(Context);

  return (
    <Container>
      <Row>
        <Col>
          <h3>Featured Songs</h3>
        </Col>
        {isAuthenticated && (
          <Col xs='auto'>
            <Button
              variant='outline-dark'
              onClick={handleCreateOpen}
            >
              New
            </Button>
          </Col>
        )}
      </Row>
      {error && <AppMessage />}
      {!error && data && (
        <Row data-testid='card-row'>
          {data.map(song => (
            <CardWrapper
              key={song.id}
              song={song}
              handleDeleteOpen={handleDeleteOpen}
            />
          ))}
        </Row>
      )}
    </Container>
  );
};

FeaturedSongs.propTypes = {
  data: PropTypes.array,
  error: PropTypes.object,
  handleCreateOpen: PropTypes.func.isRequired,
  handleDeleteOpen: PropTypes.func.isRequired,
};

export default FeaturedSongs;
