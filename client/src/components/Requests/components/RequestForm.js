// RequestForm shows a form for a user to add input
import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import RequestField from "./RequestField";
import validateEmails from "../../../utils/validateEmails";
import formFields from "./formFields";
// import SelectableSong from './SelectableSong';
import { Async } from "react-select";

class RequestForm extends Component {

  getOptions(input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }
    return fetch(
      `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${input}&api_key=644459a6b109d6d8d8320b2596eddb8b&format=json`
    )
      .then(response =>response.json())
      .then(json => {
        console.log("json", json.results.trackmatches.track);
        const results = json.results.trackmatches.track.map(res=>({value:res.name, label:res.name}));
        return { options: results };
      });
  }
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
          {/*<Field
            name="sourceTrack"
            component={props => (
              <Async 
                name="sourceTrack" 
                value="one" 
                loadOptions={this.getOptions} 
                value={props.input.value}
                onChange={props.input.onChange}
                onBlur={() => props.input.onBlur(props.input.value)}
                placeholder="Select" 
                simpleValue
              />
            )}
          />*/}
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
