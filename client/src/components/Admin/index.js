import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { formatData, filterData, getQuery } from '../../utils';
import Api from '../../utils/api';

import Loader from '../Loader/presenter';
import AppMessage from '../AppMessage/presenter';
import Admin from './presenter';

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
        const res = await Api.get('/api/albums');
        const albums = await res.json();
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
  if (isError) return <AppMessage />;

  return (
    <Admin
      history={history}
      searchText={searchText}
      total={data.length}
      filteredData={filteredData}
      searchInput={searchInput}
      handleChange={handleChange}
      clearInput={clearInput}
    />
  );
};

AdminContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default AdminContainer;
