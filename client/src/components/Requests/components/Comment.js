import React, { Component } from 'react';
import RepliesList from './RepliesList';
import ReplyForm from './ReplyForm';
import CommentCard from './CommentCard';
class Comment extends Component {
	state = { showReplyForm: false };

	handleClickReplyButton = (evt) => {
		evt.preventDefault();
		this.setState({ showReplyForm: !this.state.showReplyForm });
	};

	toggleFormVisibility = () =>{
		this.setState({ showReplyForm: !this.state.showReplyForm });
	}

	handleUpvote = () =>
		this.props.handleUpvoteCommentFn(
			this.props.comment._id,
			this.props.auth._id,
			this.props.requestId
		);

	handleDownvote = () =>
		this.props.handleDownvoteCommentFn(
			this.props.comment._id,
			this.props.auth._id,
			this.props.requestId
		);

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
		this.props.handleDeleteCommentFn(
			this.props.comment._id,
			this.props.requestId
		);
	};

	render() {

		return (
			<div className="col s12 m8 offset-m0 l10 offset-l0">
				<CommentCard
					{...this.props}
					handleDeleteComment={this.handleDeleteComment}
					handleClickReplyButtonFn={this.handleClickReplyButton}
				/>
				{this.state.showReplyForm && (
					<ReplyForm
						comment={this.props.comment}
						handleClickFn={this.handleClick}
						toggleFormVisibility={this.toggleFormVisibility}
						handleClickReplyButtonFn={this.handleClickReplyButton}
					/>
				)}
				<RepliesList replies={this.props.comment.replies}/>
			</div>
		);
	}
}

export default Comment;
