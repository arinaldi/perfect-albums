import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import Api from '../../utils/api';
import { TOAST_TYPES, MESSAGES } from '../../constants';

import { Context } from '../Provider';
import CreateReleaseModal from './presenter';

const CreateReleaseContainer = ({ isOpen, closeModal, refresh }) => {
  const { signOut, showToast } = useContext(Context);
  const [release, setRelease] = useState({
    artist: '',
    title: '',
    date: '',
  });
  const [isValidated, setIsValidated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

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
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      setIsSaving(true);

      try {
        await Api.post('/api/releases', release, signOut, showToast);
        setIsSaving(false);
        handleClose();
        refresh(Date.now());
        showToast({
          type: TOAST_TYPES.SUCCESS,
          message: `${MESSAGES.RELEASE_PREFIX} created`,
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
    <CreateReleaseModal
      isOpen={isOpen}
      release={release}
      isValidated={isValidated}
      isSaving={isSaving}
      handleChange={handleChange}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

CreateReleaseContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default CreateReleaseContainer;
