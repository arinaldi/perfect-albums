import React, { useState, useEffect, useContext, Fragment } from 'react';
import PropTypes from 'prop-types';

import CreateEditAlbum from '../components/CreateEditAlbum';
import Loader from '../components/Loader';
import AppMessage from '../components/AppMessage';

import { getQuery } from '../utils';
import Api from '../utils/api';
import { ALERT_TYPES, MESSAGES } from '../constants';

import { MyContext } from './MyProvider';

const CreateEditAlbumContainer = ({ history, location, match }) => {
  const { signOut, showAlert } = useContext(MyContext);
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
        const { id, ...album } = await Api.get(`/api/albums/${match.params.id}`);
        setAlbum(album);
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
  }, []);

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
        await saveFunc(saveUrl, album, signOut, showAlert);
        setIsSaving(false);
        history.push(`/admin?${query}`);
        showAlert(ALERT_TYPES.SUCCESS, `${MESSAGES.PREFIX} ${action}`);
      } catch (err) {
        if (err.message !== MESSAGES.UNAUTHORIZED) {
          setIsSaving(false);
          setError(err.message);
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
