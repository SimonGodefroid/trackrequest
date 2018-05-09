import React from 'react';

import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import get from 'lodash/get';
import moment from 'moment';
import CustomizedChip from './CustomizedChip';

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

const Reply = (reply) => {
	if (reply.reply_author) {
		<span key={reply._id}>{`${reply.reply_author
			.username}: ${reply.content}`}</span>;
		return (
				<Card style={{ backgroundColor: 'pink' }} className="col s10 m10 l10">
					<CardHeader
						title={moment(reply.createdAt).format(
							'DD/MM/YYYY-hh:mm:ss'
						)}
						avatar={<CustomizedChip user={reply.reply_author} />}
					/>
					<CardContent>
						<div
							style={{
								// consider removing
								display: 'inline-block',
							}}>
							<div style={{ float: 'left' }}>
								<span style={{ color: 'green' }}>
									{
										Object.keys(
											get(reply, 'votes.upvotes', {})
										).length
									}
								</span>
								<a
									className="waves-effect waves-teal btn-flat"
									style={{ color: 'black' }}>
									<i className="material-icons">
										arrow_upward
									</i>
								</a>
								<br />
								<span style={{ color: 'red' }}>
									{
										Object.keys(
											get(reply, 'votes.downvotes', {})
										).length
									}
								</span>
								<a
									className="waves-effect waves-teal btn-flat"
									style={{
										color: 'black',
										display: 'inline-block',
									}}>
									<i className="material-icons">
										arrow_downward
									</i>
								</a>
							</div>
							<div style={{ float: 'left' }}>
								<p>{reply.content}</p>
							</div>
						</div>
					</CardContent>
					<CardActions style={{ float: 'right' }}>
						{/*showReplyButton && (*/}
						<Button size="small" color="primary">
							Reply
						</Button>
						)}
						{/*showDeleteButton && (*/}
						<Button size="small" color="secondary">
							Delete
						</Button>
						{/*)}*/}
					</CardActions>
				</Card>
		);
	}
	return null;
};

export default Reply;
