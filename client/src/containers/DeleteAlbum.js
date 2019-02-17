import React, { Component } from 'react';

import DeleteAlbum from '../components/DeleteAlbum';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Api from '../utils/api';
import { ALERT_TYPES, MESSAGE_PREFIX } from '../constants';

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
      .then(res => res.json())
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { history, match, showAlert } = this.props;

    Api.delete(`/api/albums/${match.params.id}`)
      .then(() => {
        history.push('/admin');
        showAlert(ALERT_TYPES.SUCCESS, `${MESSAGE_PREFIX} deleted`);
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

export default DeleteAlbumContainer;
