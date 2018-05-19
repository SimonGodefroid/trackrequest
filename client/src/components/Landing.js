import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actionCreators from './Requests/modules/actions';
import map from 'lodash/map';
import GridList from './GridList';
class Landing extends Component {
	componentDidMount() {
		this.props.fetchRequests();
	}
	render() {
		return (
			<div style={{ textAlign: 'center' }}>
			{/*<h1>Tracks Requests !</h1>*/}
				<h5>

					<Paper style={{ padding: '1em' }}>
						<p>
							Ask for covers, remixes, mash ups and everything
							in-between, by World Class DJs and Producers to any
							artist, wannabe artist, occasional artist, fan or
							creative folk.
						</p>
							<Icon style={{color:'#3f51b5'}}>music_note</Icon>
							<Icon style={{color:'black'}}>add</Icon>
							<Icon style={{color:'#B388FF'}}>group</Icon>
							<Icon style={{color:'black'}}>add</Icon>
							<Icon style={{color:'grey'}}>build</Icon>
							<Icon style={{color:'black'}}>arrow_forward</Icon>
							<Icon style={{color:'#f50057'}}>favorite</Icon>
						<div>
							<h5><em>" </em>Genius lies as much in the ideation as in the execution.<em>"</em></h5>
						</div>
					</Paper>
				</h5>
				{this.props.requests &&
					<GridList requests={this.props.requests} />
					}
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
