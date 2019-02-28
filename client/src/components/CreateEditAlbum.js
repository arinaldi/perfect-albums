import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const CreateEditAlbum = ({
  artist,
  album,
  year,
  cd,
  aotd,
  title,
  handleChange,
  handleSubmit
}) => (
  <Container>
    <h3>{`${title} Album`}</h3>
    <Row>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formHorizontalArtist'>
            <Col sm={2}>
              Artist
            </Col>
            <Col sm={10}>
              <Form.Control
                type='text'
                value={artist}
                name='artist'
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group controlId='formHorizontalAlbum'>
            <Col sm={2}>
              Album
            </Col>
            <Col sm={10}>
              <Form.Control
                type='text'
                value={album}
                name='album'
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group controlId='formHorizontalYear'>
            <Col sm={2}>
              Year
            </Col>
            <Col sm={10}>
              <Form.Control
                type='text'
                value={year}
                name='year'
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group controlId='formHorizontalCd'>
            <Col sm={2}>
              CD
            </Col>
            <Col sm={10}>
              <Form.Check
                inline
                type='radio'
                name='cd'
                label='false'
                checked={cd === false}
                value='false'
                onChange={handleChange}
              />
              <Form.Check
                inline
                type='radio'
                name='cd'
                label='true'
                checked={cd === true}
                value='true'
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group controlId='formHorizontalAotd'>
            <Col sm={2}>
              AotD
            </Col>
            <Col sm={10}>
              <Form.Check
                inline
                type='radio'
                name='aotd'
                label='false'
                checked={aotd === false}
                value='false'
                onChange={handleChange}
              />
              <Form.Check
                inline
                type='radio'
                name='aotd'
                label='true'
                checked={aotd === true}
                value='true'
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group>
            <Col sm={10}>
              <Link to='/admin'>
                <Button variant='outline-dark'>Cancel</Button>
              </Link>&nbsp;&nbsp;
              <Button variant='outline-dark' type='submit'>Save</Button>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  </Container>
);

CreateEditAlbum.propTypes = {
  artist: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  year: PropTypes.string,
  cd: PropTypes.bool.isRequired,
  aotd: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

CreateEditAlbum.defaultProps = {
  year: '',
};

export default CreateEditAlbum;
