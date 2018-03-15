import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import 'react-select/dist/react-select.css';
const SelectableArtist = createClass({
	displayName: 'Selectable',
	propTypes: {
		label: PropTypes.string
	},
	getInitialState() {
		return {
			backspaceRemoves: true,
			multi: false,
			creatable: false
		};
	},
	onChange(value) {
		this.setState({
			value: value
		});
	},
	getUsers(input) {
		if (!input) {
			return Promise.resolve({ options: [] });
		}
		return fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${input}&api_key=644459a6b109d6d8d8320b2596eddb8b&format=json`)
			.then(response => response.json())
			.then(json => {
				console.log('json', json.results.trackmatches.track);
				return { options: json.results.trackmatches.track };
			});
	},
	gotoUser(value, event) {
		window.open(value.html_url);
	},
	render() {
		const AsyncComponent = this.state.creatable ? Select.AsyncCreatable : Select.Async;

		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label} </h3>
				<AsyncComponent
					multi={this.state.multi}
					value={this.state.value}
					onChange={this.onChange}
					onValueClick={this.gotoUser}
					valueKey="mbid"
					labelKey="artist"
					loadOptions={this.getUsers}
					backspaceRemoves={this.state.backspaceRemoves}
				/>
			</div>
		);
	}
});
// http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=diplo&api_key=644459a6b109d6d8d8320b2596eddb8b&format=json
module.exports = SelectableArtist;
