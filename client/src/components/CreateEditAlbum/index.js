import React, { useState, useEffect, useContext, Fragment } from 'react';
import PropTypes from 'prop-types';

import { getQuery } from '../../utils';
import Api from '../../utils/api';
import { TOAST_TYPES, MESSAGES } from '../../constants';

import { Context } from '../Provider';
import Loader from '../Loader/presenter';
import AppMessage from '../AppMessage/presenter';
import CreateEditAlbum from './presenter';

const CreateEditAlbumContainer = ({ history, location, match }) => {
  const { signOut, showToast } = useContext(Context);
  const [album, setAlbum] = useState({
    artist: '',
    title: '',
    year: '',
    cd: false,
    aotd: false,
    favorite: false,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isValidated, setIsValidated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const query = location.search ? getQuery(location.search) : '';
    const isEditMode = match.path.includes('edit');
    const fetchData = async () => {
      try {
        const res = await Api.get(`/api/albums/${match.params.id}`);
        const album = await res.json();

        if (res.status === 200) {
          setAlbum(album);
        } else {
          throw new Error(MESSAGES.ERROR);
        }
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    };

    setQuery(query);
    setIsEditMode(isEditMode);

    if (isEditMode) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [location, match]);

  const handleChange = ({ target: { name, value } }) => {
    let newValue = value;

    if (name === 'year') {
      newValue = value.replace(/\D/, '');
    }

    setAlbum({
      ...album,
      [name]: newValue,
    });
  };

  const handleRadioChange = (value, e) => {
    setAlbum({
      ...album,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const saveFunc = isEditMode ? Api.put : Api.post;
    const saveUrl = isEditMode
      ? `/api/albums/${match.params.id}`
      : '/api/albums';
    const action = isEditMode ? 'edited' : 'created';

    if (form.checkValidity()) {
      setIsSaving(true);

      try {
        await saveFunc(saveUrl, album, signOut, showToast);
        setIsSaving(false);
        history.push(`/admin?${query}`);
        showToast({
          type: TOAST_TYPES.SUCCESS,
          message: `${MESSAGES.ALBUM_PREFIX} ${action}`,
        });
      } catch (err) {
        if (err.message !== MESSAGES.UNAUTHORIZED) {
          setIsSaving(false);
          showToast({
            type: TOAST_TYPES.ERROR,
            message: err.message || MESSAGES.ERROR,
          });
        }
      }
    } else {
      setIsValidated(true);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Fragment>
      {error && <AppMessage message={error} />}
      <CreateEditAlbum
        history={history}
        album={album}
        isValidated={isValidated}
        isSaving={isSaving}
        query={query}
        header={isEditMode ? 'Edit' : 'Create'}
        handleChange={handleChange}
        handleRadioChange={handleRadioChange}
        handleSubmit={handleSubmit}
      />
    </Fragment>
  );
};

CreateEditAlbumContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default CreateEditAlbumContainer;