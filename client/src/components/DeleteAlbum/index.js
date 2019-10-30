import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { getQuery } from '../../utils';
import Api from '../../utils/api';
import { TOAST_TYPES, MESSAGES } from '../../constants';

import ErrorBoundary from '../ErrorBoundary';
import { Context } from '../Provider';
import Loader from '../Loader/presenter';
import AppMessage from '../AppMessage/presenter';
import DeleteAlbum from './presenter';

const DeleteAlbumContainer = () => {
  const { signOut, showToast } = useContext(Context);
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
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
        const res = await Api.get(`/api/albums/${id}`);
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
  }, [location, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDeleting(true);

    try {
      await Api.delete(`/api/albums/${id}`, signOut, showToast);
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
    <ErrorBoundary>
      {error && <AppMessage message={error} />}
      <DeleteAlbum
        artist={artist}
        title={title}
        isDeleting={isDeleting}
        query={query}
        handleSubmit={handleSubmit}
      />
    </ErrorBoundary>
  );
};

export default DeleteAlbumContainer;
