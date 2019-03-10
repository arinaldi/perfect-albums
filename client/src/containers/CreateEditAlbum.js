import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MyContext } from './MyProvider';
import CreateEditAlbum from '../components/CreateEditAlbum';
import Loader from '../components/Loader';
import AppMessage from '../components/AppMessage';

import Api from '../utils/api';
import { getQuery } from '../utils';
import { ALERT_TYPES, MESSAGES } from '../constants';

class CreateEditAlbumContainer extends Component {
  state = {
    album: {
      artist: '',
      title: '',
      year: '',
      cd: false,
      aotd: false,
      favorite: false,
    },
    isEditMode: false,
    isLoading: true,
    error: '',
    query: '',
  };

  componentDidMount () {
    const { location, match } = this.props;
    const isEditMode = match.path.includes('edit');
    const query = location.search ? getQuery(location.search) : '';

    if (isEditMode) {
      Api.get(`/api/albums/${match.params.id}`)
        .then(({ id, ...album }) => {
          this.setState({
            album,
            isEditMode,
            isLoading: false,
            error: '',
            query,
          });
        })
        .catch(err => {
          this.setState({
            isEditMode,
            isLoading: false,
            error: err.message,
            query,
          });
        });
    } else {
      this.setState({
        isEditMode,
        isLoading: false,
        query,
      });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    let newValue = value;

    if (['cd', 'aotd', 'favorite'].includes(name)) {
      newValue = value === 'true';
    } else if (name === 'year') {
      newValue = value.replace(/\D/, '');
    }

    this.setState({
      album: {
        ...this.state.album,
        [name]: newValue,
      },
    });
  }

  handleResponse (res) {
    const { showAlert, signOut } = this.context;
    const { history } = this.props;
    const { isEditMode, query } = this.state;
    const action = isEditMode ? 'edited' : 'created';

    if (res.status === 401) {
      signOut();
      showAlert(ALERT_TYPES.ERROR, MESSAGES.UNAUTHORIZED);
    } else {
      history.push(`/admin?${query}`);
      showAlert(ALERT_TYPES.SUCCESS, `${MESSAGES.PREFIX} ${action}`);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { match } = this.props;
    const { album, isEditMode } = this.state;

    if (isEditMode) {
      Api.put(`/api/albums/${match.params.id}`, album)
        .then(res => {
          this.handleResponse(res);
        })
        .catch(err => {
          this.setState({ error: err.message });
        });
    } else {
      Api.post('/api/albums', album)
        .then(res => {
          this.handleResponse(res);
        })
        .catch(err => {
          this.setState({ error: err.message });
        });
    }
  }

  render () {
    const { history } = this.props;
    const {
      album,
      isEditMode,
      isLoading,
      error,
      query,
    } = this.state;
    const header = isEditMode ? 'Edit' : 'Create';

    if (isLoading) return <Loader />;
    if (error) return <AppMessage />;

    return (
      <CreateEditAlbum
        history={history}
        album={album}
        header={header}
        query={query}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

CreateEditAlbumContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
CreateEditAlbumContainer.contextType = MyContext;

export default CreateEditAlbumContainer;
