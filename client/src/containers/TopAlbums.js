import React, { Component } from 'react';

import TopAlbums from '../components/TopAlbums';
import Loader from '../components/Loader';
import AppMessage from '../components/AppMessage';

import Api from '../utils/api';

class TopAlbumsContainer extends Component {
  state = {
    data: [],
    searchText: '',
    isLoading: true,
    error: '',
  };

  componentDidMount () {
    Api.get('/api/favorites')
      .then(data => {
        this.setState({
          data,
          isLoading: false,
          error: ''
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          error: err.message
        });
      });
  }

  render () {
    const { data, isLoading, error } = this.state;

    if (isLoading) return <Loader />;
    if (error) return <AppMessage />;

    return <TopAlbums data={data} />;
  }
}

export default TopAlbumsContainer;
