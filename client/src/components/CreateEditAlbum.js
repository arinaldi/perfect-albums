import React from 'react';
import {
  Container,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const CreateEditAlbum = ({
  history,
  album,
  header,
  query,
  handleChange,
  handleSubmit,
}) => (
  <Container>
    <h3>{`${header} Album`}</h3>
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId='formArtist'>
          <Form.Label>Artist</Form.Label>
          <Form.Control
            type='text'
            name='artist'
            value={album.artist}
            onChange={handleChange}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId='formTitle'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            name='title'
            value={album.title}
            onChange={handleChange}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId='formYear'>
          <Form.Label>Year</Form.Label>
          <Form.Control
            type='text'
            name='year'
            value={album.year}
            maxLength='4'
            onChange={handleChange}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId='formCd'>
          <Form.Label>CD</Form.Label>
          <Form.Check
            type='radio'
            name='cd'
            value='false'
            label='false'
            checked={album.cd === false}
            onChange={handleChange}
          />
          <Form.Check
            type='radio'
            name='cd'
            value='true'
            label='true'
            checked={album.cd === true}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId='formAotd'>
          <Form.Label>AotD</Form.Label>
          <Form.Check
            type='radio'
            name='aotd'
            value='false'
            label='false'
            checked={album.aotd === false}
            onChange={handleChange}
          />
          <Form.Check
            type='radio'
            name='aotd'
            value='true'
            label='true'
            checked={album.aotd === true}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId='formFavorite'>
          <Form.Label>Favorite</Form.Label>
          <Form.Check
            type='radio'
            name='favorite'
            value='false'
            label='false'
            checked={album.favorite === false}
            onChange={handleChange}
          />
          <Form.Check
            type='radio'
            name='favorite'
            value='true'
            label='true'
            checked={album.favorite === true}
            onChange={handleChange}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Button
          onClick={() => history.push(`/admin?${query}`)}
          variant='outline-dark'
          style={{ marginRight: 5 }}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          variant='outline-dark'
        >
          Save
        </Button>
      </Form.Row>
    </Form>
  </Container>
);

CreateEditAlbum.propTypes = {
  history: PropTypes.object.isRequired,
  album: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    cd: PropTypes.bool.isRequired,
    aotd: PropTypes.bool.isRequired,
    favorite: PropTypes.bool.isRequired,
  }).isRequired,
  header: PropTypes.string.isRequired,
  query: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

CreateEditAlbum.defaultProps = {
  query: '',
};

export default CreateEditAlbum;
