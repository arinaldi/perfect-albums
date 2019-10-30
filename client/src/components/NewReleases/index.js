import React, { useReducer, useState } from 'react';

import { useApiGet } from '../../utils/hooks';

import ErrorBoundary from '../ErrorBoundary';
import Loader from '../Loader/presenter';
import AppMessage from '../AppMessage/presenter';
import CreateReleaseModal from '../CreateReleaseModal';
import DeleteDataModal from '../DeleteDataModal';
import NewReleases from './presenter';

const releaseReducer = (state, action) => {
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

const NewReleasesContainer = () => {
  const [shouldRefresh, setShouldRefresh] = useState(Date.now());
  const [state, dispatch] = useReducer(releaseReducer, initialState);
  const { data, isLoading, hasError } = useApiGet({
    initialState: {},
    pathname: 'releases',
    dependency: shouldRefresh,
  });
  const { isCreateOpen, isDeleteOpen, id, artist, title } = state;

  if (isLoading) return <Loader />;
  if (hasError) return <AppMessage />;

  return (
    <ErrorBoundary>
      <NewReleases
        data={data}
        handleCreateOpen={() => dispatch({ type: 'OPEN_CREATE' })}
        handleDeleteOpen={({ id, artist, title }) => dispatch({
          type: 'OPEN_DELETE',
          payload: { id, artist, title },
        })}
      />
      <CreateReleaseModal
        isOpen={isCreateOpen}
        closeModal={() => dispatch({ type: 'CLOSE_CREATE' })}
        refresh={setShouldRefresh}
      />
      <DeleteDataModal
        isOpen={isDeleteOpen}
        dataType='Release'
        closeModal={() => dispatch({ type: 'CLOSE_DELETE' })}
        path='releases'
        data={{ id, artist, title }}
        refresh={setShouldRefresh}
      />
    </ErrorBoundary>
  );
};

export default NewReleasesContainer;
