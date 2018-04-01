import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  fetchRequests,
  upvoteRequest,
  downvoteRequest
} from "../modules/actions";
import Presenter from "./components/Presenter";
const mapStateToProps = state => {
  return {
    requests: state.requests.requests,
    auth: state.auth,
    message: state.message
  };
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({ fetchRequests, upvoteRequest, downvoteRequest }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Presenter);
