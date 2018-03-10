// RequestForm shows a form for a user to add input
import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import RequestField from "./RequestField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class RequestForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={RequestField}
          type={`text`}
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div className={"container white"}>
        <form onSubmit={this.props.handleSubmit(this.props.onRequestSubmit)}>
          {this.renderFields()}
          <button className={`teal btn-flat right white-text`} type={`submit`}>
            Next
            <i className={`material-icons right`}>done</i>
          </button>
          <Link
            to={`/requests`}
            className={`red btn-flat left white-text`}
            type={`submit`}
          >
            Cancel
            <i className={`material-icons left`}>cancel</i>
          </Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || "");
  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide ${name}!`;
    }
  });

  return errors;
}

// handleSubmit comes from surveyForm
export default reduxForm({
  validate,
  form: "surveyForm",
  // keep values after unmount of the component
  destroyOnUnmount: false
})(RequestForm);
