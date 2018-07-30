import { connect } from 'react-redux';
import AppAlert from '../components/AppAlert';

const mapStateToProps = ({ alert }) => ({
  alert
});

export default connect(mapStateToProps)(AppAlert);
