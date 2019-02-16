import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router';
import CreateEditAlbum from '../components/CreateEditAlbum';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Api from '../utils/api';
import { ALERT_TYPE, MESSAGE_PREFIX } from '../constants';

class CreateEditAlbumContainer extends Component {
  state = {
    artist: '',
    album: '',
    cd: false,
    aotd: false,
    isEditMode: this.props.match.path.includes('edit'),
    fireRedirect: false,
    isLoading: true,
    error: ''
  };

  componentDidMount () {
    const { id } = this.props.match.params;
    const { isEditMode } = this.state;

    if (isEditMode) {
      Api.get(`/api/albums/${id}`)
        .then(res => res.json())
        .then(data => {
          const { artist, album, cd, aotd } = data;
          this.setState({
            artist,
            album,
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
    if (name === 'cd' || name === 'aotd') value = value === 'true';
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { showAlert, match } = this.props;
    const { artist, album, cd, aotd, isEditMode } = this.state;

    if (isEditMode) {
      Api.put(`/api/albums/${match.params.id}`, {
        artist,
        album,
        cd,
        aotd
      })
        .then(() => {
          this.setState({ fireRedirect: true });
          showAlert(ALERT_TYPE, `${MESSAGE_PREFIX} edited`);
        })
        .catch(err => {
          this.setState({ error: err.message });
        });
    } else {
      Api.post('/api/albums', {
        artist,
        album,
        cd,
        aotd
      })
        .then(() => {
          this.setState({ fireRedirect: true });
          showAlert(ALERT_TYPE, `${MESSAGE_PREFIX} created`);
        })
        .catch(err => {
          this.setState({ error: err.message });
        });
    }
  }

  render() {
    const {
      artist,
      album,
      cd,
      aotd,
      isEditMode,
      fireRedirect,
      isLoading,
      error
    } = this.state;
    const title = isEditMode ? 'Edit' : 'Create';

    if (isLoading) return <Loader />;
    if (error) return <ErrorMessage />;

    return (
      <Fragment>
        { fireRedirect && <Redirect to='/admin' /> }
        <CreateEditAlbum
          artist={artist}
          album={album}
          cd={cd}
          aotd={aotd}
          title={title}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Fragment>
    );
  }
}
export default CreateEditAlbumContainer;
