import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import DeleteSongModal from '../components/DeleteSongModal';

import Api from '../utils/api';
import { TOAST_TYPES, MESSAGES } from '../constants';

import { MyContext } from './MyProvider';

const DeleteSongContainer = ({ isOpen, setIsOpen, activeSong, refresh }) => {
  const { signOut, showToast } = useContext(MyContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    setIsOpen(false);
    setError('');
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await Api.delete(`/api/songs/${activeSong.id}`, signOut, showToast);
      setIsDeleting(false);
      handleClose();
      refresh(Date.now());
      showToast({
        type: TOAST_TYPES.SUCCESS,
        message: `${MESSAGES.SONG_PREFIX} deleted`,
      });
    } catch (err) {
      if (err.message === MESSAGES.UNAUTHORIZED) {
        handleClose();
      } else {
        setIsDeleting(false);
        setError(err.message);
      }
    }
  };

  return (
    <DeleteSongModal
      isOpen={isOpen}
      artist={activeSong.artist}
      title={activeSong.title}
      isDeleting={isDeleting}
      handleClose={handleClose}
      handleDelete={handleDelete}
      error={error}
    />
  );
};

DeleteSongContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  activeSong: PropTypes.shape({
    id: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  refresh: PropTypes.func.isRequired,
};

export default DeleteSongContainer;
