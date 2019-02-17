import React, { Component } from 'react';

import Admin from '../components/Admin';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { formatData, filterData } from '../utils';
import Api from '../utils/api';

class AdminContainer extends Component {
  state = {
    data: [],
    filteredData: [],
    searchText: '',
    isLoading: true,
    error: ''
  };

  componentDidMount () {
    Api.get('/api/albums')
      .then(res => res.json())
      .then(data => {
        this.setState({
          data,
          filteredData: formatData(data),
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

  filterData (query) {
    let filteredData = filterData(this.state.data, query);
    filteredData = formatData(filteredData);

    this.setState({ filteredData });
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ searchText: value });
    this.filterData(value);
  }

  clearInput = () => {
    this.setState({
      filteredData: formatData(this.state.data),
      searchText: ''
    });
  }

  createAlbum = () => {
    const { history } = this.props;
    const { searchText } = this.state;

    history.push(`/new?${searchText}`);
  }

  render () {
    const { history } = this.props;
    const { searchText, filteredData, isLoading, error } = this.state;

    if (isLoading) return <Loader />;
    if (error) return <ErrorMessage />;

    return (
      <Admin
        history={history}
        searchText={searchText}
        filteredData={filteredData}
        handleChange={this.handleChange}
        clearInput={this.clearInput}
        createAlbum={this.createAlbum}
      />
    );
  }
}

export default AdminContainer;