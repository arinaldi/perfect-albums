import { connect } from 'react-redux';
import AotD from '../components/AotD';
import { loadInsta } from '../actions';

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadInsta: () => {
      dispatch(loadInsta());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AotD);
