import React, { useReducer, useState } from 'react';

import { useApiGet } from '../../utils/hooks';

import ErrorBoundary from '../ErrorBoundary';
import Loader from '../Loader/presenter';
import AppMessage from '../AppMessage/presenter';
import CreateSongModal from '../CreateSongModal';
import DeleteDataModal from '../DeleteDataModal';
import FeaturedSongs from './presenter';

const songReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
  case 'OPEN_CREATE':
    return {
      ...state,
      isCreateOpen: true,
    };
  case 'CLOSE_CREATE':
    return {
      ...state,
      isCreateOpen: false,
    };
  case 'OPEN_DELETE':
    return {
      ...state,
      isDeleteOpen: true,
      id: payload.id,
      artist: payload.artist,
      title: payload.title,
    };
  case 'CLOSE_DELETE':
    return {
      ...state,
      isDeleteOpen: false,
      id: '',
      artist: '',
      title: '',
    };
  default:
    return state;
  }
};

const initialState = {
  isCreateOpen: false,
  isDeleteOpen: false,
  id: '',
  artist: '',
  title: '',
};

const FeaturedSongsContainer = () => {
  const [shouldRefresh, setShouldRefresh] = useState(Date.now());
  const [state, dispatch] = useReducer(songReducer, initialState);
  const { data, isLoading, hasError } = useApiGet({
    initialState: [],
    pathname: 'songs',
    dependency: shouldRefresh,
  });
  const { isCreateOpen, isDeleteOpen, id, artist, title } = state;

  if (isLoading) return <Loader />;
  if (hasError) return <AppMessage />;

  return (
    <ErrorBoundary>
      <FeaturedSongs
        data={data}
        handleCreateOpen={() => dispatch({ type: 'OPEN_CREATE' })}
        handleDeleteOpen={({ id, artist, title }) => dispatch({
          type: 'OPEN_DELETE',
          payload: { id, artist, title },
        })}
      />
      <CreateSongModal
        isOpen={isCreateOpen}
        closeModal={() => dispatch({ type: 'CLOSE_CREATE' })}
        refresh={setShouldRefresh}
      />
      <DeleteDataModal
        isOpen={isDeleteOpen}
        dataType='Song'
        closeModal={() => dispatch({ type: 'CLOSE_DELETE' })}
        path='songs'
        data={{ id, artist, title }}
        refresh={setShouldRefresh}
      />
    </ErrorBoundary>
  );
};

export default FeaturedSongsContainer;
