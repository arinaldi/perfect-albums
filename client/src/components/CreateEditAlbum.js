import React from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import InputFeedback from './InputFeedback';
import RadioGroup from './RadioGroup';

const CreateEditAlbum = ({
  history,
  album,
  isValidated,
  isSaving,
  query,
  header,
  handleChange,
  handleRadioChange,
  handleSubmit,
}) => (
  <Container>
    <h3>{`${header} Album`}</h3>
    <Form
      noValidate
      validated={isValidated}
      onSubmit={handleSubmit}
    >
      <Row>
        <Col>
          <InputFeedback
            controlId='formArtist'
            label='Artist'
            name='artist'
            value={album.artist}
            onChange={handleChange}
          />
          <InputFeedback
            controlId='formTitle'
            label='Title'
            name='title'
            value={album.title}
            onChange={handleChange}
          />
          <InputFeedback
            controlId='formYear'
            label='Year'
            name='year'
            value={album.year}
            onChange={handleChange}
          />
        </Col>
        <Col sm={12} md='auto'>
          <RadioGroup
            controlId='formCd'
            label='CD'
            name='cd'
            value={album.cd}
            onChange={handleRadioChange}
          />
          <RadioGroup
            controlId='formAotd'
            label='AotD'
            name='aotd'
            value={album.aotd}
            onChange={handleRadioChange}
          />
          <RadioGroup
            controlId='formFavorite'
            label='Favorite'
            name='favorite'
            value={album.favorite}
            onChange={handleRadioChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
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
        </Col>
      </Row>
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
  handleRadioChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

CreateEditAlbum.defaultProps = {
  isValidated: false,
  isSaving: false,
  query: '',
};

export default CreateEditAlbum;
