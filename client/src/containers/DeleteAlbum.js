import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DeleteAlbum from '../components/DeleteAlbum';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Api from '../utils/api';
import { ALERT_TYPES, MESSAGES } from '../constants';

class DeleteAlbumContainer extends Component {
  state = {
    artist: '',
    album: '',
    isLoading: true,
    error: ''
  };

  componentDidMount () {
    const { id } = this.props.match.params;

    Api.get(`/api/albums/${id}`)
      .then(data => {
        const { artist, album } = data;
        this.setState({
          artist,
          album,
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

  handleResponse (res) {
    const { history, showAlert, signOut } = this.props;

    if (res.status === 401) {
      signOut();
      showAlert(ALERT_TYPES.ERROR, MESSAGES.UNAUTHORIZED);
    } else {
      history.push('/admin');
      showAlert(ALERT_TYPES.SUCCESS, `${MESSAGES.PREFIX} deleted`);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { match } = this.props;

    Api.delete(`/api/albums/${match.params.id}`)
      .then(res => {
        this.handleResponse(res);
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  }

  render () {
    const { artist, album, isLoading, error } = this.state;

    if (isLoading) return <Loader />;
    if (error) return <ErrorMessage />;

    return (
      <DeleteAlbum
        artist={artist}
        album={album}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

DeleteAlbumContainer.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  showAlert: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default DeleteAlbumContainer;
