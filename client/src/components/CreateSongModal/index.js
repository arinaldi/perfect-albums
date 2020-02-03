import React, { useState, useContext } from 'react';

import Api from '../../utils/api';
import useSubmit from '../../hooks/useSubmit';
import { MESSAGES } from '../../constants';
import { Context } from '../Provider';
import CreateSongModal from './presenter';

const CreateSongContainer = () => {
  const { state, closeModal } = useContext(Context);
  const [song, setSong] = useState({
    artist: '',
    title: '',
    link: '',
  });

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
  };

  const options = {
    apiFunc: Api.post,
    callbacks: [handleClose, state.modal.callback],
    data: song,
    path: '/api/songs',
    successMessage: `${MESSAGES.SONG_PREFIX} created`,
  };
  const { handleSubmit, isSaving, isValidated } = useSubmit(options);

  return (
    <CreateSongModal
      isOpen={state.modal.isOpen}
      song={song}
      isValidated={isValidated}
      isSaving={isSaving}
      handleChange={handleChange}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateSongContainer;
