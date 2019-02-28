import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CreateEditAlbum from '../components/CreateEditAlbum';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Api from '../utils/api';
import { ALERT_TYPES, MESSAGES } from '../constants';

class CreateEditAlbumContainer extends Component {
  state = {
    artist: '',
    album: '',
    year: '',
    cd: false,
    aotd: false,
    isEditMode: this.props.match.path.includes('edit'),
    isLoading: true,
    error: ''
  };

  componentDidMount () {
    const { id } = this.props.match.params;
    const { isEditMode } = this.state;

    if (isEditMode) {
      Api.get(`/api/albums/${id}`)
        .then(data => {
          const { artist, album, year, cd, aotd } = data;
          this.setState({
            artist,
            album,
            year,
            cd,
            aotd,
            isEditMode,
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
    } else {
      this.setState({ isLoading: false });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    let newValue = value;

    if (['cd', 'aotd'].includes(name)) {
      newValue = value === 'true';
    } else if (name === 'year') {
      newValue = value.replace(/\D/, '');
    }

    this.setState({ [name]: newValue });
  }

  handleResponse (res) {
    const { history, showAlert, signOut } = this.props;
    const { isEditMode } = this.state;
    const action = isEditMode ? 'edited' : 'created';

    if (res.status === 401) {
      signOut();
      showAlert(ALERT_TYPES.ERROR, MESSAGES.UNAUTHORIZED);
    } else {
      history.push('/admin');
      showAlert(ALERT_TYPES.SUCCESS, `${MESSAGES.PREFIX} ${action}`);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { match } = this.props;
    const { artist, album, year, cd, aotd, isEditMode } = this.state;

    if (isEditMode) {
      Api.put(`/api/albums/${match.params.id}`, {
        artist,
        album,
        year,
        cd,
        aotd
      })
        .then(res => {
          this.handleResponse(res);
        })
        .catch(err => {
          this.setState({ error: err.message });
        });
    } else {
      Api.post('/api/albums', {
        artist,
        album,
        year,
        cd,
        aotd
      })
        .then(res => {
          this.handleResponse(res);
        })
        .catch(err => {
          this.setState({ error: err.message });
        });
    }
  }

  render () {
    const {
      artist,
      album,
      year,
      cd,
      aotd,
      isEditMode,
      isLoading,
      error
    } = this.state;
    const title = isEditMode ? 'Edit' : 'Create';

    if (isLoading) return <Loader />;
    if (error) return <ErrorMessage />;

    return (
      <CreateEditAlbum
        artist={artist}
        album={album}
        year={year}
        cd={cd}
        aotd={aotd}
        title={title}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

CreateEditAlbumContainer.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  showAlert: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default CreateEditAlbumContainer;
