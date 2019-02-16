import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router';

import DeleteAlbum from '../components/DeleteAlbum';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Api from '../utils/api';
import { ALERT_TYPE, MESSAGE_PREFIX } from '../constants';

class DeleteAlbumContainer extends Component {
  state = {
    artist: '',
    album: '',
    fireRedirect: false,
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
    const { showAlert, match } = this.props;

    Api.delete(`/api/albums/${match.params.id}`)
      .then(() => {
        this.setState({ fireRedirect: true });
        showAlert(ALERT_TYPE, `${MESSAGE_PREFIX} deleted`);
      })
      // refactor me to use AppAlert
      .catch(err => {
        this.setState({ error: err.message });
      });
  }

  render () {
    const { artist, album, fireRedirect, isLoading, error } = this.state;

    if (isLoading) return <Loader />;
    if (error) return <ErrorMessage />;

    return (
      <Fragment>
        {fireRedirect && <Redirect to='/admin' />}
        <DeleteAlbum
          artist={artist}
          album={album}
          handleSubmit={this.handleSubmit}
        />
      </Fragment>
    );
  }
}

export default DeleteAlbumContainer;
