import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteSongModal = ({
  isOpen,
  artist,
  title,
  isDeleting,
  handleClose,
  handleDelete,
  error,
}) => (
  <Modal show={isOpen} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Delete Song</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{`Are you sure you want to delete ${artist} – ${title}?`}</p>
      {error && (
        <p style={{
          color: 'red',
          marginBottom: 0,
          textAlign: 'center',
        }}>
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
      <Button
        variant='outline-dark'
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </Button>
    </Modal.Footer>

  </Modal>
);

DeleteSongModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  artist: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isDeleting: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default DeleteSongModal;
