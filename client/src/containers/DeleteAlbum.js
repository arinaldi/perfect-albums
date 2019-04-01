import React, { useState, useEffect, useContext, Fragment } from 'react';
import PropTypes from 'prop-types';

import DeleteAlbum from '../components/DeleteAlbum';
import Loader from '../components/Loader';
import AppMessage from '../components/AppMessage';

import { getQuery } from '../utils';
import Api from '../utils/api';
import { ALERT_TYPES, MESSAGES } from '../constants';

import { MyContext } from './MyProvider';

const DeleteAlbumContainer = ({ history, location, match }) => {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const { signOut, showAlert } = useContext(MyContext);

  useEffect(() => {
    const query = location.search ? getQuery(location.search) : '';
    const fetchData = async () => {
      try {
        const { artist, title } = await Api.get(`/api/albums/${match.params.id}`);
        setArtist(artist);
        setTitle(title);
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    };

    setQuery(query);
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDeleting(true);

    try {
      await Api.delete(`/api/albums/${match.params.id}`, signOut, showAlert);
      setIsDeleting(false);
      history.push(`/admin?${query}`);
      showAlert(ALERT_TYPES.SUCCESS, `${MESSAGES.PREFIX} deleted`);
    } catch (err) {
      if (err.message !== MESSAGES.UNAUTHORIZED) {
        setIsDeleting(false);
        setError(err.message);
      }
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Fragment>
      {error && <AppMessage message={error} />}
      <DeleteAlbum
        history={history}
        artist={artist}
        title={title}
        isDeleting={isDeleting}
        query={query}
        handleSubmit={handleSubmit}
      />
    </Fragment>
  );
}

DeleteAlbumContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default DeleteAlbumContainer;
