import React, { useState, useEffect, Fragment } from 'react';

import FeaturedSongs from '../components/FeaturedSongs';
import Loader from '../components/Loader';
import AppMessage from '../components/AppMessage';

import Api from '../utils/api';

import CreateSongModal from './CreateSongModal';
import DeleteSongModal from './DeleteSongModal';

const FeaturedSongsContainer = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(Date.now());
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeSong, setActiveSong] = useState({
    id: '',
    artist: '',
    title: '',
  });

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
  }, [shouldRefresh]);

  const handleCreateOpen = () => {
    setIsCreateOpen(true);
  };

  const handleDeleteOpen = ({ id, artist, title }) => {
    setIsDeleteOpen(true);
    setActiveSong({ id, artist, title });
  };

  if (isLoading) return <Loader />;
  if (isError) return <AppMessage />;

  return (
    <Fragment>
      <FeaturedSongs
        data={data}
        handleCreateOpen={handleCreateOpen}
        handleDeleteOpen={handleDeleteOpen}
      />
      <CreateSongModal
        isOpen={isCreateOpen}
        setIsOpen={setIsCreateOpen}
        refresh={setShouldRefresh}
      />
      <DeleteSongModal
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        activeSong={activeSong}
        refresh={setShouldRefresh}
      />
    </Fragment>
  );
};

export default FeaturedSongsContainer;
