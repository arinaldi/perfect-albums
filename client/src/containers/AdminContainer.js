import { connect } from 'react-redux';
import { loadAlbums } from '../actions';
import Admin from '../components/Admin';

function mapStateToProps({ albums, alert, status }) {
  return {
    albums,
    alert,
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
