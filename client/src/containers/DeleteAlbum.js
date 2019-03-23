import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MyContext } from './MyProvider';
import DeleteAlbum from '../components/DeleteAlbum';
import Loader from '../components/Loader';
import AppMessage from '../components/AppMessage';

import Api from '../utils/api';
import { getQuery } from '../utils';
import { ALERT_TYPES, MESSAGES } from '../constants';

class DeleteAlbumContainer extends Component {
  state = {
    artist: '',
    title: '',
    isLoading: true,
    isDeleting: false,
    error: '',
    query: '',
  };

  componentDidMount () {
    const { location, match } = this.props;
    const query = location.search ? getQuery(location.search) : '';

    Api.get(`/api/albums/${match.params.id}`)
      .then(({ artist, title }) => {
        this.setState({
          artist,
          title,
          isLoading: false,
          error: '',
          query,
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          error: err.message,
          query,
        });
      });
  }

  handleSuccess () {
    const { showAlert } = this.context;
    const { history } = this.props;
    const { query } = this.state;

    history.push(`/admin?${query}`);
    showAlert(ALERT_TYPES.SUCCESS, `${MESSAGES.PREFIX} deleted`);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { signOut, showAlert } = this.context;
    const { match } = this.props;

    this.setState({ isDeleting: true }, () => {
      Api.delete(`/api/albums/${match.params.id}`, signOut, showAlert)
        .then(res => {
          this.setState(
            { isDeleting: false },
            () => this.handleSuccess(),
          );
        })
        .catch(err => this.setState({
          isDeleting: false,
          error: err.message,
        }));
    });
  }

  render () {
    const { history } = this.props;
    const {
      artist,
      title,
      isLoading,
      isDeleting,
      error,
      query,
    } = this.state;

    if (isLoading) return <Loader />;
    if (error) return <AppMessage />;

    return (
      <DeleteAlbum
        history={history}
        artist={artist}
        title={title}
        isDeleting={isDeleting}
        query={query}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

DeleteAlbumContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
DeleteAlbumContainer.contextType = MyContext;

export default DeleteAlbumContainer;
