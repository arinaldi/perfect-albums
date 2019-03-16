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
  isValidated,
  isSaving,
  query,
  header,
  handleChange,
  handleSubmit,
}) => (
  <Container>
    <h3>{`${header} Album`}</h3>
    <Form
      noValidate
      validated={isValidated}
      onSubmit={handleSubmit}
    >
      <Form.Row>
        <Form.Group as={Col} controlId='formArtist'>
          <Form.Label>Artist</Form.Label>
          <Form.Control
            type='text'
            name='artist'
            value={album.artist}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type='invalid'>
            Required
          </Form.Control.Feedback>
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
            required
          />
          <Form.Control.Feedback type='invalid'>
            Required
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId='formYear'>
          <Form.Label>Year</Form.Label>
          <Form.Control
            type='text'
            name='year'
            value={album.year}
            onChange={handleChange}
            required
            maxLength='4'
          />
          <Form.Control.Feedback type='invalid'>
            Required
          </Form.Control.Feedback>
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
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
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
  isValidated: PropTypes.bool,
  isSaving: PropTypes.bool,
  query: PropTypes.string,
  header: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

CreateEditAlbum.defaultProps = {
  isValidated: false,
  isSaving: false,
  query: '',
};

export default CreateEditAlbum;
