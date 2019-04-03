import React from 'react';
import {
  Button,
  Col,
  Container,
  Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const DeleteAlbum = ({
  history,
  artist,
  title,
  isDeleting,
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
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </Form.Row>
    </Form>
  </Container>
);

DeleteAlbum.propTypes = {
  history: PropTypes.object.isRequired,
  artist: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isDeleting: PropTypes.bool,
  query: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

DeleteAlbum.defaultProps = {
  isDeleting: false,
  query: '',
};

export default DeleteAlbum;
