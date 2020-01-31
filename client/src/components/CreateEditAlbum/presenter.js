import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import InputFeedback from '../InputFeedback/presenter';
import RadioGroup from '../RadioGroup/presenter';
import SubmitButton from '../SubmitButton/presenter';

const CreateEditAlbum = (props) => {
  const {
    album,
    isValidated,
    isSaving,
    query,
    header,
    handleChange,
    handleRadioChange,
    handleSubmit,
  } = props;
  const history = useHistory();

  return (
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
          <Col style={{ paddingBottom: 15 }}>
            <Button
              onClick={() => history.push(`/admin?${query}`)}
              variant='outline-dark'
              style={{ marginRight: 5 }}
            >
              Cancel
            </Button>
            <SubmitButton
              isDisabled={isSaving}
              isLoading={isSaving}
              text='Save'
              loadingText='Saving...'
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

CreateEditAlbum.propTypes = {
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
