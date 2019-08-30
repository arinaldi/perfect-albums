import React, { useState, useReducer, Fragment } from 'react';

import { useApiGet } from '../../utils/hooks';

import Loader from '../Loader/presenter';
import AppMessage from '../AppMessage/presenter';
import CreateSongModal from '../CreateSongModal';
import DeleteSongModal from '../DeleteSongModal';
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
  const { data, isLoading, isError } = useApiGet({
    initialState: [],
    pathname: 'songs',
    dependency: shouldRefresh,
  });
  const { isCreateOpen, isDeleteOpen, id, artist, title } = state;

  if (isLoading) return <Loader />;
  if (isError) return <AppMessage />;

  return (
    <Fragment>
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
      <DeleteSongModal
        isOpen={isDeleteOpen}
        closeModal={() => dispatch({ type: 'CLOSE_DELETE' })}
        activeSong={{ id, artist, title }}
        refresh={setShouldRefresh}
      />
    </Fragment>
  );
};

export default FeaturedSongsContainer;
