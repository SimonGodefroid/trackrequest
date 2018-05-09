// RequestForm shows a form for a user to add input
import map from 'lodash/map';
import each from 'lodash/each';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { Async } from 'react-select';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'halogenium';

import RequestField from './RequestField';
import formFields from './formFields';
import { RECIPES, FLAVOURS } from './formOptions';
import 'react-select/dist/react-select.css';
import Suggestions from './Suggestions';

class RequestForm extends Component {
	state = {
		suggestions: [],
	};
	componentDidMount() {
		/**
	 * Fetch of the top charts for suggestions
	 */
		return fetch(
			`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${process.env
				.REACT_APP_LAST_KEY}&format=json`
		)
			.then((response) => response.json())
			.then((json) => {
				this.setState({ suggestions: json.tracks.track });
			});
	}

	/**
	 * Method to go to artist url on click on artist name
	 */
	gotoArtist = (value, event) => {
		window.open(value.url);
	};

	/**
	 * Method to get the tracks options for the react-select component
	 */
	getOptionsTracks = (input) => {
		if (!input) {
			return Promise.resolve({ options: [] });
		}
		return fetch(
			`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${input}&api_key=644459a6b109d6d8d8320b2596eddb8b&format=json`
		)
			.then((response) => response.json())
			.then((json) => {
				const results = json.results.trackmatches.track.map((res) => ({
					value: res.name,
					label: `${res.name} by ${res.artist}`,
					songUrl: res.url,
				}));
				return { options: results };
			});
	};

	/**
	 * Method to get the artists options for the react-select component
	 */
	getOptionsArtists = (input) => {
		if (!input) {
			return Promise.resolve({ options: [] });
		}
		return fetch(
			`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${input}&api_key=${process.env
				.REACT_APP_LAST_KEY}&format=json`
		)
			.then((response) => response.json())
			.then((json) => {
				const results = json.results.artistmatches.artist.map((res) => ({
					value: res.name,
					label: res.name,
					url: res.url,
					images: res.image,
				}));
				return { options: results };
			});
	};

	/**
	 * Method to render the form fields that are not react-select fields
	 */
	renderFields = () =>
		map(formFields.filter((field) => field.select === false), ({ label, name }) => (
			<Field key={name} component={RequestField} type={`text`} label={label} name={name} />
		));

	render() {
		console.log('this.formFields', this.props);
		if (!this.state.suggestions.length) {
			return (
				<div className={'center'}>
					<PulseLoader color="#26A65B" size="16px" margin="4px" />
				</div>
			);
		} else {
			return (
				<div className={'container white'} style={{ marginTop: '100px' }}>
					<h3 className={`center`}>Create your request</h3>
					<Suggestions suggestions={this.state.suggestions} />
					<form onSubmit={this.props.handleSubmit(this.props.onRequestSubmit)} style={{ margin: '100px' }}>{/* Recipe Field */}
					<div>
					<p>I would love to hear a </p>
						<label>Recipe</label>
						<Field
							name="recipeSelect"
							component={(props) => (
								<Select
									{...props}
									// multi
									options={RECIPES}
									placeholder="Select a recipe"
									value={props.input.value}
									onChange={props.input.onChange}
									onBlur={() => {
										props.input.onBlur(props.input.value);
									}}
								/>
							)}
						/>
						<div className={`red-text`} style={{ marginBottom: '20px' }} />
					</div>
					{/* End of Recipe Field */}

						{/* Source Track Field */}
						<div>
						<p>of the song</p>
							<label>Source Track</label>
							<Field
								name="sourceTrackSelect"
								placeholder="Search for the source track"
								component={(props) => (
									<Async
										loadOptions={this.getOptionsTracks}
										value={props.input.value}
										onChange={props.input.onChange}
										onBlurResetsInput={false}
										{...props}
										onBlur={() => {
											props.input.onBlur(props.input.value);
										}}
									/>
								)}
							/>
							<div className={`red-text`} style={{ marginBottom: '20px' }} />
						</div>
						{/* End of Source Track Field */}
						{/* Source Artist Field */}
						<div>
						<p>originally performed by</p>
							<label>Source Artist</label>
							<Field
								name="sourceArtistSelect"
								placeholder="Search for the source artist"
								component={(props) => (
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
							<div className={`red-text`} style={{ marginBottom: '20px' }} />
						</div>
						{/* End of Source Artist Field */}
						{/* Target Artist Field */}
						<div>
						<p>revisited by</p>
							<label>Target Artist</label>
							<Field
								name="targetArtistSelect"
								placeholder="Search a target artist"
								component={(props) => (
									<Async
										{...props}
										onValueClick={this.gotoArtist}
										loadOptions={this.getOptionsArtists}
										value={props.input.value}
										onChange={props.input.onChange}
										onBlur={() => {
											props.input.onBlur(props.input.value);
										}}
									/>
								)}
							/>
							<div className={`red-text`} style={{ marginBottom: '20px' }} />
						</div>
						{/* End of Target Artist Field */}
						{/* Flavour Field */}
					<div>
					<p>reworked à la </p>
							<label>Flavour</label>
							<Field
								name="flavourSelect"
								component={(props) => (
									<Select.Creatable
										{...props}
										// multi
										creatable={true}
										options={FLAVOURS}
										placeholder="Select a flavour"
										value={props.input.value}
										onChange={props.input.onChange}
										onBlur={() => {
											props.input.onBlur(props.input.value);
										}}
									/>
								)}
							/>
							<div className={`red-text`} style={{ marginBottom: '20px' }} />
						</div>
						{/* End of Flavour Field */}
						{this.renderFields()}
						<div style={{ paddingTop: '20px' }}>
							<button className={`teal btn-flat right white-text`} type={`submit`}>
								Next
								<i className={`material-icons right`}>done</i>
							</button>
							<Link
								to={`/requests`}
								className={`red btn-flat left white-text`}
								type={`submit`}
								onClick={() => {
									this.props.destroy();
								}}>
								Cancel
								<i className={`material-icons left`}>cancel</i>
							</Link>
						</div>
					</form>
				</div>
			);
		}
	}
}

/**
 * Method to generate error messages when fields are in error
*/
const validate = (values) => {
	const errors = {};
	// errors.recipients = validateEmails(values.recipients || '');
	each(formFields, ({ name }) => {
		console.log(name, values[name]);
		if (!values[name]) {
			errors[name] = `You must provide ${name}!`;
		}
	});
	console.log('errors', errors);
	return errors;
};

/**
	 * Method to get the form values from redux-form's selector
	 */
const selector = formValueSelector('requestForm'); // <-- same as form name
RequestForm = connect((state) => ({
	sourceTrack: selector(state, 'sourceTrackSelect'),
	sourceArtist: selector(state, 'sourceArtistSelect'),
}))(RequestForm);

// handleSubmit comes from requestForm
export default reduxForm({
	validate,
	form: 'requestForm',
	// keep values after unmount of the component
	destroyOnUnmount: false,
})(RequestForm);
