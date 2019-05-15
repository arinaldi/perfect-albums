import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import { MyContext } from '../containers/MyProvider';

const CardWrapper = ({ song, handleDeleteOpen }) => {
  const { state } = useContext(MyContext);

  return (
    <Col xs={12} md={6} lg={3} style={{
      paddingTop: '7.5px',
      paddingBottom: '7.5px',
    }}>
      <Card>
        <Card.Body>
          <Card.Title>{song.title}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>{song.artist}</Card.Subtitle>
          <Card.Link
            href={song.link}
            target='_blank'
            rel='noopener noreferrer'
          >
            Listen
          </Card.Link>
          {state.isAuthenticated && (
            <Card.Link
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={() => handleDeleteOpen(song)}
            >
              Delete
            </Card.Link>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

CardWrapper.propTypes = {
  song: PropTypes.object.isRequired,
  handleDeleteOpen: PropTypes.func.isRequired,
};

const FeaturedSongs = ({ data, handleCreateOpen, handleDeleteOpen }) => {
  const { state } = useContext(MyContext);

  return (
    <Container>
      <Row>
        <Col>
          <h3>Featured Songs</h3>
        </Col>
        {state.isAuthenticated && (
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
      <Row data-testid='card-row'>
        {data.map(song => (
          <CardWrapper
            key={song.id}
            song={song}
            handleDeleteOpen={handleDeleteOpen}
          />
        ))}
      </Row>
    </Container>
  );
};

FeaturedSongs.propTypes = {
  data: PropTypes.array.isRequired,
  handleCreateOpen: PropTypes.func.isRequired,
  handleDeleteOpen: PropTypes.func.isRequired,
};

export default FeaturedSongs;
