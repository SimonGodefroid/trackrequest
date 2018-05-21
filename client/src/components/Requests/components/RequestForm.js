// RequestForm shows a form for a user to add input
import map from 'lodash/map';
import each from 'lodash/each';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { Async, AsyncCreatable } from 'react-select';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'halogenium';

import Paper from 'material-ui/Paper';
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
			`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${process
				.env.REACT_APP_LAST_KEY}&format=json`
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
			`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${input}&api_key=${process
				.env.REACT_APP_LAST_KEY}&format=json`
		)
			.then((response) => response.json())
			.then((json) => {
				const results = json.results.trackmatches.track.map((res) => ({
					value: res.name,
					label: `${res.name} by ${res.artist}`,
					artist: res.artist,
					songUrl: res.url,
					images: res.image,
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
			`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${input}&api_key=${process
				.env.REACT_APP_LAST_KEY}&format=json`
		)
			.then((response) => response.json())
			.then((json) => {
				const results = json.results.artistmatches.artist.map(
					(res) => ({
						value: res.name,
						label: res.name,
						url: res.url,
						images: res.image,
					})
				);
				return {
					options: [
						...results,
						{
							value: 'Any artist !',
							label: 'Any artist !',
							url: '#',
							images: '',
						},
					],
				};
			});
	};

	/**
	 * Method to render the form fields that are not react-select fields
	 */
	renderFields = () =>
		map(
			formFields.filter((field) => field.select === false),
			({ label, name }) => (
				<Field
					key={name}
					component={RequestField}
					type={`text`}
					label={label}
					name={name}
				/>
			)
		);

	render() {
		console.log('this.state',this.state)
		return (
			<div className={'container white'} style={{ marginTop: '100px' }}>
				<h3 className={`center`}>Create your request</h3>
				{this.state.suggestions.length && (
					<Suggestions suggestions={this.state.suggestions} />
				)}
				<form
					onSubmit={this.props.handleSubmit(
						this.props.onRequestSubmit
					)}
					style={{ margin: '100px' }}>
					{/* Recipe Field */}
					<div>
						<h5>
							I would love to hear a{' '}
							<span style={{ color: 'green' }}>{`${this.props
								.recipe || ''}`}</span>
						</h5>

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
						<label>
							The <em>Recipe</em> is the type of version you
							expect, Cover, Remix, Mashup...
						</label>
						<div
							className={`red-text`}
							style={{ marginBottom: '20px' }}
						/>
					</div>
					{/* End of Recipe Field */}

					{/* Source Track Field */}
					<div>
						<h5>
							of the song{' '}
							<span style={{ color: 'green' }}>{`${this.props
								.sourceTrack || ''}`}</span>
						</h5>
						<Field
							name="sourceTrackSelect"
							placeholder="Search for the source track"
							component={(props) => (
								<AsyncCreatable
									creatable={true}
									loadOptions={this.getOptionsTracks}
									value={props.input.value}
									onChange={(value) => {
										if (value && value.songUrl) {
											const url = value.songUrl.substring(
												0,
												value.songUrl.search('/_/')
											);
											this.props.change(
												'sourceArtistSelect',
												{
													value: value.artist || '',
													label: value.artist || '',
													url: url,
													images: value.images || [],
												}
											);
										}
										props.input.onChange(value);
									}}
									onBlurResetsInput={false}
									{...props}
									onBlur={() => {
										props.input.onBlur(props.input.value);
									}}
								/>
							)}
						/>
						<label>
							The <em>Source Track</em> is the original track you
							want to be reworked
						</label>
						<div
							className={`red-text`}
							style={{ marginBottom: '20px' }}
						/>
					</div>
					{/* End of Source Track Field */}
					{/* Source Artist Field */}
					<div>
						<h5>
							originally performed by{' '}
							<span style={{ color: 'green' }}>{`${this.props
								.sourceArtist || ''}`}</span>
						</h5>
						<Field
							name="sourceArtistSelect"
							placeholder="Search for the source artist"
							component={(props) => (
								<AsyncCreatable
									creatable={true}
									onValueClick={this.gotoArtist}
									loadOptions={this.getOptionsArtists}
									onChange={props.input.onChange}
									{...props}
									value={props.input.value}
									onBlur={() => {
										props.input.onBlur(props.input.value);
									}}
								/>
							)}
						/>
						<label>
							The <em>Source Artist</em> is the artist who
							originally performed the source track, fill this
							field if we don't have the artist in the database
						</label>
						<div
							className={`red-text`}
							style={{ marginBottom: '20px' }}
						/>
					</div>
					{/* End of Source Artist Field */}
					{/* Target Artist Field */}
					<div>
						<h5>
							revisited by{' '}
							<span style={{ color: 'green' }}>{`${this.props
								.targetArtist || ''}`}</span>
						</h5>

						<Field
							name="targetArtistSelect"
							placeholder="Search a target artist"
							component={(props) => (
								<AsyncCreatable
									{...props}
									creatable={true}
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
						<label>
							The <em>Target Artist</em> is the artist you would
							like to perform the rework, create an option if we
							don't have the artist (yet) in the database
						</label>
						<div
							className={`red-text`}
							style={{ marginBottom: '20px' }}
						/>
					</div>
					{/* End of Target Artist Field */}
					{/* Flavour Field */}
					<div>
						<h5>
							reworked in a{' '}
							<span style={{ color: 'green' }}>{`${(this.props
								.flavour || '<insert here>') + ' vibe' ||
								''}`}</span>
						</h5>

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
						<label>
							The <em>Flavour</em> is the style in which you would
							love the target song to be reworked
						</label>
						<div
							className={`red-text`}
							style={{ marginBottom: '20px' }}
						/>
					</div>
					{/* End of Flavour Field */}
					{this.renderFields()}
					<div style={{ paddingTop: '20px' }}>
						<button
							className={`teal btn-flat right white-text`}
							type={`submit`}>
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

/**
 * Method to generate error messages when fields are in error
*/
const validate = (values) => {
	const errors = {};
	// errors.recipients = validateEmails(values.recipients || '');
	each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = `You must provide a ${name}!`;
		}
	});
	return errors;
};

/**
	 * Method to get the form values from redux-form's selector
	 */
const selector = formValueSelector('requestForm'); // <-- same as form name
RequestForm = connect((state) => ({
	recipe: selector(state, 'recipeSelect.value'),
	sourceTrack: selector(state, 'sourceTrackSelect.value'),
	sourceArtist: selector(state, 'sourceArtistSelect.value'),
	targetArtist: selector(state, 'targetArtistSelect.value'),
	flavour: selector(state, 'flavourSelect.value'),
}))(RequestForm);

// handleSubmit comes from requestForm
export default reduxForm({
	validate,
	form: 'requestForm',
	// keep values after unmount of the component
	destroyOnUnmount: false,
})(RequestForm);
