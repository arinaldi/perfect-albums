import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MyConsumer } from './MyProvider';
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

  handleResponse (res, showAlert, signOut) {
    const { history } = this.props;
    const { query } = this.state;

    if (res.status === 401) {
      signOut();
      showAlert(ALERT_TYPES.ERROR, MESSAGES.UNAUTHORIZED);
    } else {
      history.push(`/admin?${query}`);
      showAlert(ALERT_TYPES.SUCCESS, `${MESSAGES.PREFIX} deleted`);
    }
  }

  handleSubmit = (e, showAlert, signOut) => {
    e.preventDefault();
    const { match } = this.props;

    Api.delete(`/api/albums/${match.params.id}`)
      .then(res => {
        this.handleResponse(res, showAlert, signOut);
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  }

  render () {
    const { history } = this.props;
    const {
      artist,
      title,
      isLoading,
      error,
      query,
    } = this.state;

    if (isLoading) return <Loader />;
    if (error) return <AppMessage />;

    return (
      <MyConsumer>
        {({ showAlert, signOut }) => (
          <DeleteAlbum
            history={history}
            artist={artist}
            title={title}
            query={query}
            handleSubmit={e => this.handleSubmit(e, showAlert, signOut)}
          />
        )}
      </MyConsumer>
    );
  }
}

DeleteAlbumContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default DeleteAlbumContainer;
