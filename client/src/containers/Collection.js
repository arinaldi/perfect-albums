import { connect } from 'react-redux';
import { loadAlbums } from '../actions';
import Collection from '../components/Collection';

function mapStateToProps({ albums, status }) {
  return {
    albums,
    status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAlbums: () => {
      dispatch(loadAlbums());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
