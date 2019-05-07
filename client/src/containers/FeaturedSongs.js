import React, { useState, useEffect } from 'react';

import FeaturedSongs from '../components/FeaturedSongs';
import Loader from '../components/Loader';
import AppMessage from '../components/AppMessage';

import Api from '../utils/api';

const FeaturedSongsContainer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Api.get('/api/songs');
        setData(data);
      } catch (err) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <AppMessage />;

  return <FeaturedSongs data={data} />;
};

export default FeaturedSongsContainer;
