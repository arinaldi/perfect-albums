import React from 'react';

import ErrorBoundary from '../ErrorBoundary';
import { useStateMachine } from '../../utils/hooks';
import TopAlbums from './presenter';

const TopAlbumsContainer = () => {
  const [state] = useStateMachine('/api/favorites');
  const { data, error } = state;

  return (
    <ErrorBoundary>
      <TopAlbums data={data} error={error} />
    </ErrorBoundary>
  );
};

export default TopAlbumsContainer;
