import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import songs from '../data/featuredSongs';

const CardWrapper = ({ song }) => (
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
      </Card.Body>
    </Card>
  </Col>
);

CardWrapper.propTypes = {
  song: PropTypes.object.isRequired,
};

const FeaturedSongs = () => (
  <Container>
    <h3>Featured Songs</h3>
    <Row>
      {songs.map(song => <CardWrapper key={song.id} song={song} />)}
    </Row>
  </Container>
);

export default FeaturedSongs;
