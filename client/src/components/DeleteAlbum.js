import React from 'react';
import {
  Container,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const DeleteAlbum = ({
  history,
  artist,
  title,
  query,
  handleSubmit,
}) => (
  <Container>
    <h3>Delete Album</h3>
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId='formConfirm'>
          {`Are you sure you want to delete ${artist} – ${title}?`}
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
          Delete
        </Button>
      </Form.Row>
    </Form>
  </Container>
);

DeleteAlbum.propTypes = {
  history: PropTypes.object.isRequired,
  artist: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  query: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

DeleteAlbum.defaultProps = {
  query: '',
};

export default DeleteAlbum;
