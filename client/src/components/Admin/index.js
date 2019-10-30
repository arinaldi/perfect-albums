import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { formatData, filterData, getQuery } from '../../utils';
import Api from '../../utils/api';

import ErrorBoundary from '../ErrorBoundary';
import Loader from '../Loader/presenter';
import AppMessage from '../AppMessage/presenter';
import Admin from './presenter';

const AdminContainer = () => {
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const searchInput = useRef(null);

  useEffect(() => {
    const searchText = location.search ? getQuery(location.search) : '';

    const fetchData = async (searchText) => {
      try {
        const res = await Api.get('/api/albums');
        const albums = await res.json();
        const filteredAlbums = searchText
          ? formatData(filterData(albums, searchText))
          : formatData(albums);

        setData(albums);
        setFilteredData(filteredAlbums);
      } catch (err) {
        setHasError(true);
      }

      setIsLoading(false);
    };

    setSearchText(searchText);
    fetchData(searchText);
  }, [location]);

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
  };

  if (isLoading) return <Loader />;
  if (hasError) return <AppMessage />;

  return (
    <ErrorBoundary>
      <Admin
        searchText={searchText}
        total={data.length}
        filteredData={filteredData}
        searchInput={searchInput}
        handleChange={handleChange}
        clearInput={clearInput}
      />
    </ErrorBoundary>
  );
};

export default AdminContainer;
