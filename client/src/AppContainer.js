import App from './App';
import { connect } from 'react-redux';
import { loadInsta, loadAlbums } from './actions';

function mapDispatchToProps(dispatch) {
  return {
    loadInsta: () => {
      dispatch(loadInsta());
    },
    loadAlbums: () => {
      dispatch(loadAlbums());
    }
  };
}

export default connect(null, mapDispatchToProps)(App);
