import React, { useState, useEffect, useContext, Fragment } from 'react';
import PropTypes from 'prop-types';

import { getQuery } from '../../utils';
import Api from '../../utils/api';
import { TOAST_TYPES, MESSAGES } from '../../constants';

import { Context } from '../Provider';
import Loader from '../Loader/presenter';
import AppMessage from '../AppMessage/presenter';
import DeleteAlbum from './presenter';

const DeleteAlbumContainer = ({ history, location, match }) => {
  const { signOut, showToast } = useContext(Context);
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const query = location.search ? getQuery(location.search) : '';
    const fetchData = async () => {
      try {
        const res = await Api.get(`/api/albums/${match.params.id}`);
        const { artist, title } = await res.json();

        if (res.status === 200) {
          setArtist(artist);
          setTitle(title);
        } else {
          throw new Error(MESSAGES.ERROR);
        }
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    };

    setQuery(query);
    fetchData();
  }, [location, match]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDeleting(true);

    try {
      await Api.delete(`/api/albums/${match.params.id}`, signOut, showToast);
      setIsDeleting(false);
      history.push(`/admin?${query}`);
      showToast({
        type: TOAST_TYPES.SUCCESS,
        message: `${MESSAGES.ALBUM_PREFIX} deleted`,
      });
    } catch (err) {
      if (err.message !== MESSAGES.UNAUTHORIZED) {
        setIsDeleting(false);
        showToast({
          type: TOAST_TYPES.ERROR,
          message: err.message || MESSAGES.ERROR,
        });
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
};

DeleteAlbumContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default DeleteAlbumContainer;
