import { connect } from 'react-redux';
import NewAlbum from '../components/NewAlbum';
import { createAlbum } from '../actions';

function mapDispatchToProps(dispatch) {
  return {
    createAlbum: (album) => {
      const action = createAlbum(album);
      dispatch(action);
    }
  };
}

export default connect(null, mapDispatchToProps)(NewAlbum);
