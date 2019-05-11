import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

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

const FeaturedSongs = ({ data }) => (
  <Container>
    <h3>Featured Songs</h3>
    <Row data-testid='card-row'>
      {data.map(song => <CardWrapper key={song.id} song={song} />)}
    </Row>
  </Container>
);

FeaturedSongs.propTypes = {
  data: PropTypes.array.isRequired,
};

export default FeaturedSongs;
