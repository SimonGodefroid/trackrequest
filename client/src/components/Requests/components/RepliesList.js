import React, { Component } from 'react';

import { PulseLoader } from 'halogenium';

import ReplyCard from './ReplyCard';

class RepliesList extends Component {
	render() {
		if (this.props.replies.length) {
			return this.props.replies.map((reply, index) => (
				<ReplyCard
					{...this.props}
					key={`${reply._id} ${index}`}
					reply={reply}
					comment={this.props.comment}
				/>
			));
		} else {
			return null;
		}
	}
}

export default RepliesList;

// <div className="col s12 m8 offset-m0 l8 offset-l0">
// 				<div className="card-panel grey lighten-5 z-depth-1">
// 					<div className="row valign-wrapper">

{
	/*<div>
							<span style={{ color: 'green' }}>
								{Object.keys(get(this.props.reply, 'votes.upvotes', {})).length}
							</span>
							<a className="waves-effect waves-teal btn-flat" style={{ color: 'black' }}>
								<i className="material-icons" onClick={this.handleUpvote}>
									arrow_upward
								</i>
							</a>
							<br />
							<span style={{ color: 'red' }}>
								{Object.keys(get(this.props.reply, 'votes.downvotes', {})).length * -1}
							</span>
							<a
								className="waves-effect waves-teal btn-flat"
								style={{ color: 'black', display: 'inline-block' }}>
								<i className="material-icons" onClick={this.handleDownvote}>
									arrow_downward
								</i>
							</a>
						</div>*/
}
