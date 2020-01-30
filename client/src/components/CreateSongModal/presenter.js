import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import InputFeedback from '../InputFeedback/presenter';
import SubmitButton from '../SubmitButton/presenter';

const CreateSongModal = ({
  isOpen,
  song,
  isValidated,
  isSaving,
  handleChange,
  handleClose,
  handleSubmit,
  error,
}) => (
  <Modal show={isOpen} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Create Song</Modal.Title>
    </Modal.Header>
    <Form
      noValidate
      validated={isValidated}
      onSubmit={handleSubmit}
    >
      <Modal.Body>
        <InputFeedback
          controlId='formArtist'
          label='Artist'
          name='artist'
          value={song.artist}
          onChange={handleChange}
        />
        <InputFeedback
          controlId='formTitle'
          label='Title'
          name='title'
          value={song.title}
          onChange={handleChange}
        />
        <InputFeedback
          controlId='formLink'
          label='Link'
          name='link'
          value={song.link}
          onChange={handleChange}
        />
        {error && (
          <p style={{
            color: 'red',
            marginBottom: 0,
            textAlign: 'center',
          }}
          >
            {error}
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='outline-dark'
          onClick={handleClose}
        >
          Close
        </Button>
        <SubmitButton
          isDisabled={isSaving}
          isLoading={isSaving}
          text='Save'
          loadingText='Saving...'
        />
      </Modal.Footer>
    </Form>
  </Modal>
);

CreateSongModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  song: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }),
  isValidated: PropTypes.bool,
  isSaving: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default CreateSongModal;
