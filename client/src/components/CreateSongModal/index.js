import React, { useState, useContext } from 'react';

import Api from '../../utils/api';
import { TOAST_TYPES, MESSAGES } from '../../constants';
import { Context } from '../Provider';
import CreateSongModal from './presenter';

const CreateSongContainer = () => {
  const { state, signOut, showToast, closeModal } = useContext(Context);
  const [song, setSong] = useState({
    artist: '',
    title: '',
    link: '',
  });
  const [isValidated, setIsValidated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setSong({
      ...song,
      [name]: value,
    });
  };

  const handleClose = () => {
    closeModal();
    setSong({
      artist: '',
      title: '',
      link: '',
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      setIsSaving(true);

      try {
        await Api.post('/api/songs', {
          data: song,
          signOut,
          showToast,
        });
        setIsSaving(false);
        handleClose();
        state.modal.callback();
        showToast({
          type: TOAST_TYPES.SUCCESS,
          message: `${MESSAGES.SONG_PREFIX} created`,
        });
      } catch (err) {
        if (err.message === MESSAGES.UNAUTHORIZED) {
          handleClose();
        } else {
          setIsSaving(false);
          setError(err.message);
        }
      }
    } else {
      setIsValidated(true);
    }
  };

  return (
    <CreateSongModal
      isOpen={state.modal.isOpen}
      song={song}
      isValidated={isValidated}
      isSaving={isSaving}
      handleChange={handleChange}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

export default CreateSongContainer;
