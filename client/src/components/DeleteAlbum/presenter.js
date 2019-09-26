import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

import SubmitButton from '../SubmitButton/presenter';

const DeleteAlbum = ({
  artist,
  title,
  isDeleting,
  query,
  handleSubmit,
}) => {
  const history = useHistory();

  return (
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
          <SubmitButton
            isDisabled={isDeleting}
            isLoading={isDeleting}
            text='Delete'
            loadingText='Deleting...'
          />
        </Form.Row>
      </Form>
    </Container>
  );
};

DeleteAlbum.propTypes = {
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
