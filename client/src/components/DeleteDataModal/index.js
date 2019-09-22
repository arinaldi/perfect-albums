import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import Api from '../../utils/api';
import { TOAST_TYPES, MESSAGES } from '../../constants';

import { Context } from '../Provider';
import DeleteDataModal from './presenter';

const DeleteDataContainer = ({ isOpen, dataType, closeModal, path, data, refresh }) => {
  const { signOut, showToast } = useContext(Context);
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
      await Api.delete(`/api/${path}/${data.id}`, signOut, showToast);
      setIsDeleting(false);
      handleClose();
      refresh(Date.now());
      showToast({
        type: TOAST_TYPES.SUCCESS,
        message: `${dataType} successfully deleted`,
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
      dataType={dataType}
      artist={data.artist}
      title={data.title}
      isDeleting={isDeleting}
      handleClose={handleClose}
      handleDelete={handleDelete}
      error={error}
    />
  );
};

DeleteDataContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  dataType: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  refresh: PropTypes.func.isRequired,
};

export default DeleteDataContainer;
