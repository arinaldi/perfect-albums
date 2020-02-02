import React, { useContext } from 'react';

import { useStateMachine } from '../../utils/hooks';
import {
  MODAL_TYPES,
  STATE_EVENTS,
  STATE_STATUSES,
} from '../../constants';
import { Context } from '../Provider';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import FeaturedSongs from './presenter';

const FeaturedSongsContainer = () => {
  const { openModal } = useContext(Context);
  const [state, dispatch] = useStateMachine('/api/songs');
  const { data, status } = state;

  const cancel = () => {
    dispatch({ type: STATE_EVENTS.CANCEL });
  };

  const refresh = () => {
    dispatch({ type: STATE_EVENTS.FETCH });
  };

  const handleCreateOpen = () => {
    openModal({
      type: MODAL_TYPES.FEATURED_SONGS_CREATE,
      callback: refresh,
    });
  };

  const handleDeleteOpen = (data) => {
    openModal({
      type: MODAL_TYPES.DATA_DELETE,
      data: {
        ...data,
        dataType: 'Song',
        path: 'songs',
      },
      callback: refresh,
    });
  };

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={status === STATE_STATUSES.LOADING} />
      <FeaturedSongs
        cancel={cancel}
        data={data}
        handleCreateOpen={handleCreateOpen}
        handleDeleteOpen={handleDeleteOpen}
        refresh={refresh}
        status={status}
      />
    </ErrorBoundary>
  );
};

export default FeaturedSongsContainer;
