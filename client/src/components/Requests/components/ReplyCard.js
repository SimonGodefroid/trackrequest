import React, { Component } from 'react';
import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import CustomizedChip from './CustomizedChip';

import get from 'lodash/get';
import moment from 'moment';

import ReplyForm from './ReplyForm';

class ReplyCard extends Component {
	state = {
		showFormReply: false,
	};
	handleClick = (evt) => {
		evt.preventDefault();
		this.setState({ showFormReply: !this.state.showFormReply });
	};

	handleDeleteReply = (e) => {
		e.preventDefault();
		const { reply, auth, requestId } = this.props;
		this.props
			.deleteReply(auth._id, requestId, reply._id)
			.then(() => this.props.getComments(requestId));
	};

	handleUpvoteReply = (evt) =>{
		evt.preventDefault();
		const { reply, auth, requestId } = this.props;
		console.log('Coucou upvote')
		this.props.upvoteReply(auth._id,reply._id)
		.then(() => this.props.getComments(requestId));
	}
	handleDownvoteReply = (evt) =>{
		evt.preventDefault();
		const { reply, auth, requestId } = this.props;
		console.log('Coucou downvote')
		this.props.downvoteReply(auth._id,reply._id)
		.then(() => this.props.getComments(requestId));
	}

	render() {
		console.log('reply card this.props',this.props)
		if (Object.keys(this.props.reply).length) {
			return (
				<div key={this.props.reply._id}>
					<Card
						style={{ backgroundColor: 'pink' }}
						className="col s10 m10 l10">
						<CardHeader
							title={moment(this.props.reply.createdAt).format(
								'DD/MM/YYYY-hh:mm:ss'
							)}
							avatar={
								<CustomizedChip
									user={this.props.reply.reply_author}
								/>
							}
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
												get(
													this.props.reply,
													'votes.upvotes',
													{}
												)
											).length
										}
									</span>
									<a
										className="waves-effect waves-teal btn-flat"
										style={{ color: 'black' }}
										onClick={this.handleUpvoteReply}
										>
										<i className="material-icons">
											thumb_up
										</i>
									</a>
									<br />
									<span style={{ color: 'red' }}>
										{
											Object.keys(
												get(
													this.props.reply,
													'votes.downvotes',
													{}
												)
											).length
										}
									</span>
									<a
										className="waves-effect waves-teal btn-flat"
										style={{
											color: 'black',
											display: 'inline-block',
										}}
										onClick={this.handleDownvoteReply}
										>
										<i className="material-icons">
										thumb_down
										</i>
									</a>
								</div>
								<div style={{ float: 'left' }}>
									<p>{this.props.reply.content}</p>
								</div>
							</div>
						</CardContent>
						<CardActions style={{ float: 'right' }}>
							{/*showReplyButton && (*/}
							<Button
								size="small"
								color="primary"
								onClick={this.handleClick}>
								Reply
							</Button>
							{/*)}*/}
							{/*showDeleteButton && (*/}
							<Button
								size="small"
								color="secondary"
								onClick={this.handleDeleteReply}>
								Delete
							</Button>
							{/*)}*/}
						</CardActions>
						<div>
							{this.state.showFormReply && (
								<ReplyForm
									comment={this.props.comment}
									toggleFormVisibility={this.handleClick}
								/>
							)}
						</div>
					</Card>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default ReplyCard;
