import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Admin from '../components/Admin';
import Loader from '../components/Loader';
import AppMessage from '../components/AppMessage';

import { formatData, filterData, getQuery } from '../utils';
import Api from '../utils/api';

const AdminContainer = ({ history, location }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const searchInput = useRef(null);

  useEffect(() => {
    const searchText = location.search ? getQuery(location.search) : '';
    const fetchData = async (searchText) => {
      try {
        const albums = await Api.get('/api/albums');
        const filteredAlbums = searchText
          ? formatData(filterData(albums, searchText))
          : formatData(albums);
        
        setData(albums);
        setFilteredData(filteredAlbums);
      } catch (err) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    setSearchText(searchText);
    fetchData(searchText);
  }, []);

  const handleChange = ({ target: { value } }) => {
    setSearchText(value);
    setFilteredData(formatData(filterData(data, value)));
  };

  const clearInput = () => {
    setFilteredData(formatData(data));
    setSearchText('');
    searchInput.current.focus();

    if (location.search) {
      location.search = '';
      history.push(location);
    }
  }

  if (isLoading) return <Loader />;
  if (isError) return <AppMessage />;

  return (
    <Admin
      history={history}
      searchText={searchText}
      filteredData={filteredData}
      searchInput={searchInput}
      handleChange={handleChange}
      clearInput={clearInput}
    />
  );
}

AdminContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default AdminContainer;
