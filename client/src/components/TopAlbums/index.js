import React from 'react';

import { useStateMachine } from '../../utils/hooks';
import { STATE_EVENTS } from '../../constants';
import ErrorBoundary from '../ErrorBoundary';
import TopAlbums from './presenter';

const TopAlbumsContainer = () => {
  const [state, dispatch] = useStateMachine('/api/favorites');
  const { data, status } = state;

  const cancel = () => {
    dispatch({ type: STATE_EVENTS.CANCEL });
  };

  const refresh = () => {
    dispatch({ type: STATE_EVENTS.FETCH });
  };

  return (
    <ErrorBoundary>
      <TopAlbums
        cancel={cancel}
        data={data}
        refresh={refresh}
        status={status}
      />
    </ErrorBoundary>
  );
};

export default TopAlbumsContainer;
