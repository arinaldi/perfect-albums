import React, { useState, useContext } from 'react';

import Api from '../../utils/api';
import { TOAST_TYPES, MESSAGES } from '../../constants';

import { Context } from '../Provider';
import DeleteDataModal from './presenter';

const DeleteDataContainer = () => {
  const { state, signOut, showToast, closeModal } = useContext(Context);
  const { isOpen, data, callback } = state.modal;
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    closeModal();
    setError('');
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsDeleting(true);

    try {
      await Api.delete(`/api/${data.path}/${data.id}`, signOut, showToast);
      setIsDeleting(false);
      handleClose();
      callback();
      showToast({
        type: TOAST_TYPES.SUCCESS,
        message: `${data.dataType} successfully deleted`,
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
    <DeleteDataModal
      isOpen={isOpen}
      dataType={data.dataType}
      artist={data.artist}
      title={data.title}
      isDeleting={isDeleting}
      handleClose={handleClose}
      handleDelete={handleDelete}
      error={error}
    />
  );
};

export default DeleteDataContainer;
