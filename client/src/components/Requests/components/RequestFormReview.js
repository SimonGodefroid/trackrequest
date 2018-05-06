// RequestFormReview show user their form inputs for review
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../modules/actions';
import { sanitizeFormValues } from '../modules/helpers';
const RequestFormReview = ({
  onCancel,
  auth,
  formValues,
  submitTrackRequest,
  history,
}) => {
  const reviewRegularFields = formFields
    .filter(field => field.select === false)
    .map(field => (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{formValues[field.name]}</div>
      </div>
    ));
  const reviewSelectField = formFields
    .filter(field => field.select === true)
    .map(field => (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{formValues[field.name]['value']}</div>
      </div>
    ));
  const reviewFields = [...reviewSelectField, ...reviewRegularFields];
  // make helper method to pass as values the stuff for react-select fields
  const formValuesToSubmit = sanitizeFormValues(formValues);
  return (
    <div className={'container white'} style={{ marginTop: '100px' }}>
      <h5 className={`center`}>Please confirm your entries !</h5>
      {reviewFields}
      <button
        className={`yellow darken-3 white-text btn-flat`}
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() =>
          submitTrackRequest(formValuesToSubmit,auth._id, history)
        }
        className={`green white-text btn-flat right`}
      >
        Submit Track Request
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  formValues: state.form.requestForm.values,
});

export default connect(mapStateToProps, actions)(withRouter(RequestFormReview));
