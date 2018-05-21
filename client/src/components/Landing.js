import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actionCreators from './Requests/modules/actions';
import NewIn from './Core/NewIn';
// import Suggestions from './Requests/components/Suggestions';
import map from 'lodash/map';
// import GridList from './GridList';
class Landing extends Component {
	componentDidMount() {
		this.props.fetchRequests();
	}
	render() {
		return (
			<div style={{ textAlign: 'center' }}>
				{/*<h1>Tracks Requests !</h1>*/}
				<div style={{ padding: '0 40px' }}>
					<h4>Ask for </h4>{' '}
					<h5>
						{' '}
						covers, remixes, mash ups and everything in-between,
					</h5>{' '}
					<h4>to be performed by</h4>{' '}
					<h5>
						World Class DJs and Producers to any artist, wannabe
						artist, occasional artist, fan or creative folk
					</h5>
				</div>
				<div style={{display:'inline-block'}}>
					<span><Icon style={{ color: '#3f51b5' }}>music_note</Icon></span>
					<span><Icon style={{ color: 'black' }}>add</Icon></span>
					<span><Icon style={{ color: '#B388FF' }}>group</Icon></span>
					<span><Icon style={{ color: 'black' }}>add</Icon></span>
					<span><Icon style={{ color: 'grey' }}>build</Icon></span>
					<span><Icon style={{ color: 'black' }}>arrow_forward</Icon></span>
					<span><Icon style={{ color: '#f50057' }}>favorite</Icon></span>
				</div>
				<div>
					<h5>
						<em>" </em>Genius lies as much in the ideation as in the
						execution.<em>"</em>
					</h5>
				</div>
				<div>
				{this.props.requests && (
					<NewIn suggestions={this.props.requests} />
				)}
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	auth: state.auth,
	requests: state.requests.requests,
});
const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ ...actionCreators }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
