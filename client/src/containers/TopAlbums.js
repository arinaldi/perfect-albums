import React from 'react';

import TopAlbums from '../components/TopAlbums';
import Loader from '../components/Loader';
import AppMessage from '../components/AppMessage';

import { useApiGet } from '../utils/customHooks';

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
