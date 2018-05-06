import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as actionCreators from '../Requests/modules/actions';
import Upvote from './Upvote';
import Downvote from './Downvote';


class VoteButtons extends Component {

	handleUpvote = (userId,id,fetchOption) => {
		if(fetchOption==='single'){
			this.props.upvoteRequest(userId, id).then(() => {
				this.props.fetchCurrentRequest(id);
			});
		}else{
			this.props.upvoteRequest(userId, id).then(() => {
				this.props.fetchRequests();
			});
		}
	}

	handleDownvote = (userId,id,fetchOption) => {
		if(fetchOption==='single'){
			this.props.downvoteRequest(userId, id).then(() => {
				this.props.fetchCurrentRequest(id);
			});
		}else{
			this.props.downvoteRequest(userId, id).then(() => {
				this.props.fetchRequests();
			});
		}
	}


	render() {
		return (
			<div style={{ display: 'block', textAlign:'center' }}>
				<p>
					<Upvote handleClick={this.handleUpvote} {...this.props}/>
				</p>
				<div>{(this.props.request.upvotes - this.props.request.downvotes).toString()}</div>
				<p>
					<Downvote handleClick={this.handleDownvote} {...this.props}/>
				</p>
			</div>
		);
	}
}

const mapStateToProps = state => ({auth: state.auth});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actionCreators }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(VoteButtons);
