import React from 'react';

import ErrorBoundary from '../ErrorBoundary';
import { useApiGet } from '../../utils/hooks';

import Loader from '../Loader/presenter';
import AppMessage from '../AppMessage/presenter';
import TopAlbums from './presenter';

const TopAlbumsContainer = () => {
  const { data, isLoading, hasError } = useApiGet({
    initialState: {},
    pathname: 'favorites',
  });

  if (isLoading) return <Loader />;
  if (hasError) return <AppMessage />;

  return (
    <ErrorBoundary>
      <TopAlbums data={data} />
    </ErrorBoundary>
  );
};

export default TopAlbumsContainer;
