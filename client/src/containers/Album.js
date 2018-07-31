import { connect } from 'react-redux';
import Album from '../components/Album';
import { getAlbum, createAlbum, editAlbum } from '../actions';

function mapStateToProps({ album, status }) {
  return {
    album,
    status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAlbum: (id) => {
      dispatch(getAlbum(id));
    },
    createAlbum: (album) => {
      dispatch(createAlbum(album));
    },
    editAlbum: (id, item) => {
      dispatch(editAlbum(id, item));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);
