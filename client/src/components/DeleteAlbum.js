import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const DeleteAlbum = ({ artist, title, handleSubmit }) => (
  <Container>
    <h3>Delete Album</h3>
    <Row>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Col>
              {`Are you sure you want to delete ${artist} – ${title}?`}
            </Col>
          </Form.Group>
          <Form.Group>
            <Col>
              <Link to='/admin'>
                <Button variant='outline-dark'>Cancel</Button>
              </Link>&nbsp;&nbsp;
              <Button variant='outline-dark' type='submit'>Delete</Button>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  </Container>
);

DeleteAlbum.propTypes = {
  artist: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default DeleteAlbum;
