import React, { Component } from 'react';
import get from 'lodash/get';
import Reply from './Reply';
import ReplyForm from './ReplyForm';
import CustomizedChip from './CustomizedChip';
import CommentComponent from './CommentComponent';
class Comment extends Component {
	state = { showReplyForm: false };

	handleClick = (evt) => {
		evt.preventDefault();
		this.setState({ showReplyForm: !this.state.showReplyForm });
		this.setState({ reply: '' });
	};

	handleUpvote = () =>
		this.props.handleUpvoteCommentFn(this.props.comment._id, this.props.auth._id, this.props.requestId);

	handleDownvote = () =>
		this.props.handleDownvoteCommentFn(this.props.comment._id, this.props.auth._id, this.props.requestId);

	handleSubmitReply = (evt) => {
		this.handleClick(evt);
		this.props.handleSubmitReplyFn(
			this.props.auth._id,
			this.props.requestId,
			this.props.comment._id,
			this.state.reply
		);
	};

	handleDeleteComment = (evt) => {
		evt.preventDefault();
		this.props.handleDeleteCommentFn(this.props.comment._id, this.props.requestId);
	};

	renderReplies = (props) => {
		if (props.comment.replies) {
			const replies = props.comment.replies.map((rep, index) => <Reply key={index} {...rep} />);
			return replies;
		}
		return null;
	};

	render() {
		const showDeleteButton = this.props.comment.author._id === this.props.auth._id;
		const showReplyButton = this.props.auth ? true : false;
		return (
      <div className="col s12 m8 offset-m0 l10 offset-l0">
      <CommentComponent {...this.props}/>
				{/*<div className="card-panel grey lighten-5 z-depth-1">
					<div className="row valign-wrapper">
						<div>
							<span style={{ color: 'green' }}>
								{Object.keys(get(this.props.comment, 'votes.upvotes', {})).length}
							</span>
							<a className="waves-effect waves-teal btn-flat" style={{ color: 'black' }}>
								<i className="material-icons" onClick={this.handleUpvote}>
									arrow_upward
								</i>
							</a>
							<br />
							<span style={{ color: 'red' }}>
								{Object.keys(get(this.props.comment, 'votes.downvotes', {})).length * -1}
							</span>
							<a
								className="waves-effect waves-teal btn-flat"
								style={{ color: 'black', display: 'inline-block' }}>
								<i className="material-icons" onClick={this.handleDownvote}>
									arrow_downward
								</i>
							</a>
						</div>
						<div className="col s2">
							<CustomizedChip user={this.props.user} />
						</div>
						<div className="col s10">
							<p className="black-text">{this.props.comment.content}</p>
							{showDeleteButton && (
								<input
									className="btn waves-effect waves-light red right"
									type="submit"
									value="delete"
									onClick={this.handleDeleteComment}
								/>
							)}
							{showReplyButton && (
								<input
									className="btn waves-effect waves-light right"
									type="submit"
									value="reply"
									onClick={this.handleClick}
								/>
							)}
						</div>
					</div>
					{this.renderReplies(this.props)}
				</div>
				{this.state.showReplyForm && (
					<ReplyForm comment={this.props.comment} handleClickFn={this.handleClick} />
				)}*/}
			</div>
		);
	}
}

export default Comment;
