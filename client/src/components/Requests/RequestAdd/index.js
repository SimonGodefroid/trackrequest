// RequestNew shows RequestForm and RequestReview
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
// import RequestFormReview from "../components/RequestFormReview";
import Presenter from './components/Presenter';

const mapStateToProps = (state) => (
  {
    auth: state.auth,
  })

export default reduxForm({
  form: "requestForm",
  destroyOnUnmount: true,
})(connect(mapStateToProps,null)(Presenter));
