import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import Admin from '../components/Admin';
import Loader from '../components/Loader';
import AppMessage from '../components/AppMessage';

import { formatData, filterData, getQuery } from '../utils';
import Api from '../utils/api';

class AdminContainer extends Component {
  state = {
    data: [],
    filteredData: [],
    searchText: '',
    isLoading: true,
    error: ''
  };

  searchInput = createRef();

  componentDidMount () {
    const { search } = this.props.location;
    const searchText = search ? getQuery(search) : '';

    this.getData(searchText);
    this.setState({ searchText });
  }

  getData (searchText) {
    Api.get('/api/albums')
      .then(data => {
        const filteredData = searchText
          ? formatData(filterData(data, searchText))
          : formatData(data);

        this.setState({
          data,
          filteredData,
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
    const { data } = this.state;
    const filteredData = formatData(filterData(data, query));

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
    this.searchInput.current.focus();
  }

  render () {
    const { history } = this.props;
    const { searchText, filteredData, isLoading, error } = this.state;

    if (isLoading) return <Loader />;
    if (error) return <AppMessage />;

    return (
      <Admin
        history={history}
        searchText={searchText}
        filteredData={filteredData}
        searchInput={this.searchInput}
        handleChange={this.handleChange}
        clearInput={this.clearInput}
      />
    );
  }
}

AdminContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default AdminContainer;