// SurveyFormReview show user their form inputs for review
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../modules/actions";
const RequestFormReview = ({
  onCancel,
  formValues,
  submitTrackRequest,
  history
}) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });
  return (
    <div>
      <h5>Please confirm your entries !</h5>
      {reviewFields}
      <button
        className={`yellow darken-3 white-text btn-flat`}
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitTrackRequest(formValues, history)}
        className={`green white-text btn-flat right`}
      >
        Submit Track Request
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}
export default connect(mapStateToProps, actions)(withRouter(RequestFormReview));
