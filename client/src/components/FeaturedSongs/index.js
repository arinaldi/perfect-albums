import React, { useContext } from 'react';

import { useStateMachine } from '../../utils/hooks';
import {
  ALERT_TYPES,
  MODAL_TYPES,
  STATE_EVENTS,
} from '../../constants';
import { Context } from '../Provider';
import ErrorBoundary from '../ErrorBoundary';
import AppMessage from '../AppMessage/presenter';
import FeaturedSongs from './presenter';

const FeaturedSongsContainer = () => {
  const { openModal } = useContext(Context);
  const [state, dispatch] = useStateMachine('/api/songs');
  const { data, error } = state;

  const dispatchFetch = () => {
    dispatch({ type: STATE_EVENTS.FETCH });
  };

  if (error) {
    return <AppMessage type={ALERT_TYPES.ERROR} message={error.message} />;
  }

  return (
    <ErrorBoundary>
      <FeaturedSongs
        data={data}
        handleCreateOpen={() => openModal({
          type: MODAL_TYPES.FEATURED_SONGS_CREATE,
          callback: dispatchFetch,
        })}
        handleDeleteOpen={data => openModal({
          type: MODAL_TYPES.DATA_DELETE,
          data: {
            ...data,
            dataType: 'Song',
            path: 'songs',
          },
          callback: dispatchFetch,
        })}
      />
    </ErrorBoundary>
  );
};

export default FeaturedSongsContainer;
