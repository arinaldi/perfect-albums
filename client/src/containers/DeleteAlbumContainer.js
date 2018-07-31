import { connect } from 'react-redux';
import DeleteAlbum from '../components/DeleteAlbum';
import { getAlbum, deleteAlbum } from '../actions';

function mapStateToProps({ album, status }) {
  return {
    album,
    status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAlbum: (id) => {
      const action = getAlbum(id);
      dispatch(action);
    },
    deleteAlbum: (item) => {
      dispatch(deleteAlbum(item));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAlbum);
