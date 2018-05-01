import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actionCreators from '../modules/actions';
import Presenter from './components/Presenter';

const mapStateToProps = state => ({
  auth: state.auth,
  comments: state.requests.comments,
  currentRequest: state.requests.currentRequest,
  message: state.message,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actionCreators }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Presenter));
