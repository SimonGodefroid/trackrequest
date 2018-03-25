// RequestForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import RequestField from './RequestField';
import validateEmails from '../../../utils/validateEmails';
import formFields from './formFields';
// import SelectableSong from './SelectableSong';
import { Async } from 'react-select';
import 'react-select/dist/react-select.css';

class RequestForm extends Component {
  gotoArtist(value, event) {
      window.open(value.url);
    }
  getOptionsArtists(input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }
    return fetch(
      `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${input}&api_key=644459a6b109d6d8d8320b2596eddb8b&format=json`,
    )
      .then(response => response.json())
      .then(json => {
        // console.log('json', json.results.artistmatches.artist);
        const results = json.results.artistmatches.artist.map(res => ({
          value: res.name,
          label: res.name,
          url:res.url,
        }));
        return { options: results };
      });
  }
  getOptionsTracks(input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }
    return fetch(
      `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${input}&api_key=644459a6b109d6d8d8320b2596eddb8b&format=json`,
    )
      .then(response => response.json())
      .then(json => {
        const results = json.results.trackmatches.track.map(res => ({
          value: res.name,
          label: res.name,
        }));
        return { options: results };
      });
  }
  renderFields() {
    return _.map(formFields.filter(field=>field.select===false), ({ label, name }) => {
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
      <div className={'container white'} style={{ marginTop: '20px' }}>
        <form onSubmit={this.props.handleSubmit(this.props.onRequestSubmit)}>
          <div>
            <label>Source Track</label>
            <Field
              name="sourceTrackSelect"
              placeholder="Search for the source track"
              component={props => (
                <Async
                loadOptions={this.getOptionsTracks}
                value={props.input.value}
                onChange={props.input.onChange}
                onBlurResetsInput={false}
                onBlur={() => {
                  props.input.onBlur(props.input.value);
                }}
                {...props}
                />
              )}
            />
            <div className={`red-text`} style={{ marginBottom: '20px' }}>
            </div>
          </div>

          <div>
            <label>Source Artist</label>
            <Field
              name="sourceArtistSelect"
              placeholder="Search for the source artist"
              component={props => (
                <Async
                onValueClick={this.gotoArtist}
                loadOptions={this.getOptionsArtists}
                value={props.input.value}
                onChange={props.input.onChange}
                {...props}
                  onBlur={() => {
                    props.input.onBlur(props.input.value);
                  }}
                />
              )}
            />
            <div className={`red-text`} style={{ marginBottom: '20px' }}>
            </div>
          </div>
          <div>
            <label>Source Artist</label>
            <Field
              name="targetArtistSelect"
              placeholder="Search a target artist"
              component={props => (
                <Async
                  {...props}
                  onValueClick={this.gotoArtist}
                  loadOptions={this.getOptionsArtists}
                  value={props.input.value}
                  onChange={props.input.onChange}
                  onBlur={() => {
                    props.input.onBlur(props.input.value);
                  }}
                  // simpleValue
                />
              )}
            />
            <div className={`red-text`} style={{ marginBottom: '20px' }}>
            </div>
          </div>
          {this.renderFields()}
          <button className={`teal btn-flat right white-text`} type={`submit`}>
            Next
            <i className={`material-icons right`}>done</i>
          </button>
          <Link
            to={`/requests`}
            className={`red btn-flat left white-text`}
            type={`submit`}
            onClick={()=>{this.props.destroy()}}
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
  // errors.recipients = validateEmails(values.recipients || '');
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
  form: 'surveyForm',
  // keep values after unmount of the component
  destroyOnUnmount: false,
})(RequestForm);
