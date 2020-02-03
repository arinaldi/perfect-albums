import React, { useState, useContext } from 'react';

import Api from '../../utils/api';
import useSubmit from '../../hooks/useSubmit';
import { MESSAGES } from '../../constants';
import { Context } from '../Provider';
import CreateReleaseModal from './presenter';

const CreateReleaseContainer = () => {
  const { state, closeModal } = useContext(Context);
  const [release, setRelease] = useState({
    artist: '',
    title: '',
    date: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setRelease({
      ...release,
      [name]: value,
    });
  };

  const handleClose = () => {
    closeModal();
    setRelease({
      artist: '',
      title: '',
      date: '',
    });
  };

  const options = {
    apiFunc: Api.post,
    callbacks: [handleClose, state.modal.callback],
    data: release,
    path: '/api/releases',
    successMessage: `${MESSAGES.RELEASE_PREFIX} created`,
  };
  const { handleSubmit, isSaving, isValidated } = useSubmit(options);

  return (
    <CreateReleaseModal
      isOpen={state.modal.isOpen}
      release={release}
      isValidated={isValidated}
      isSaving={isSaving}
      handleChange={handleChange}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateReleaseContainer;
