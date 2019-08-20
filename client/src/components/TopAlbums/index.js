import React from 'react';

import { useApiGet } from '../../utils/hooks';

import Loader from '../Loader/presenter';
import AppMessage from '../AppMessage/presenter';
import TopAlbums from './presenter';

const TopAlbumsContainer = () => {
  const { data, isLoading, isError } = useApiGet({
    initialState: {},
    pathname: 'favorites',
  });

  if (isLoading) return <Loader />;
  if (isError) return <AppMessage />;

  return <TopAlbums data={data} />;
};

export default TopAlbumsContainer;
