import { connect } from 'react-redux';
import AotD from '../components/AotD';
import { loadInsta } from '../actions';

function mapStateToProps({ posts, status }) {
  return {
    posts,
    status
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
