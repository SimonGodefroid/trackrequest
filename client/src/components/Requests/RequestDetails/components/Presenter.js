import React, { Component } from 'react';
import { PulseLoader } from 'halogenium';
import get from 'lodash/get';
import Button from 'material-ui/Button';

import Comment from '../../components/Comment';
import VoteButtons from '../../../Core/VoteButtons';
import Notice from '../../../Core/Notice';
import './request-details.css';

class RequestDetails extends Component {
	state = {
		comment: '',
	};

	componentDidMount() {
		this.props
			.fetchCurrentRequest(this.props.match.params.id)
			.then(() => this.props.getComments(this.props.match.params.id));
	}

	componentWillUnmount() {
		this.props.clearCurrentRequest(this.props.match.params.id);
	}

	handleChange = (evt) => {
		evt.preventDefault();
		this.setState({ comment: evt.target.value });
	};

	handleSubmitComment = (evt) => {
		evt.preventDefault();
		this.props
			.postComment(this.props.auth._id, this.props.match.params.id, this.state.comment)
			.then(() => this.props.getComments(this.props.match.params.id))
			.then(() => this.setState({ comment: '' }));
	};

	handleDeleteComment = (commentId, requestId) => {
		this.props.deleteComment(commentId, requestId).then(() => this.props.getComments(requestId));
	};

	handleUpvoteComment = (commentId, userId, requestId) => {
		this.props.upvoteComment(commentId, userId).then(() => this.props.getComments(requestId));
	};

	handleDownvoteComment = (commentId, userId, requestId) => {
		this.props.downvoteComment(commentId, userId).then(() => this.props.getComments(requestId));
	};

	handleDeleteRequest = () => {
		this.props.deleteRequest(this.props.match.params.id, this.props.history);
	};

	handleSubmitReply = (userId, requestId, commentId, content) => {
		this.props.postReply(userId, requestId, commentId, content).then(() => this.props.getComments(requestId));
	};

	renderComments() {
		if (this.props.comments && this.props.comments.length > 0) {
			const commentList = this.props.comments.map((comment) => (
				<Comment
					user={comment.author}
					auth={this.props.auth}
					key={comment._id}
					comment={comment}
					requestId={this.props.match.params.id}
					handleDeleteCommentFn={this.handleDeleteComment}
					handleUpvoteCommentFn={this.handleUpvoteComment}
					handleDownvoteCommentFn={this.handleDownvoteComment}
					handleSubmitReplyFn={this.handleSubmitReply}
				/>
			));
			return commentList;
		}
	}

	renderDeleteButton() {
		const { currentRequest } = this.props;
		const userId = this.props.auth._id;
		const showDeleteButton = currentRequest && currentRequest.author ? currentRequest.author._id === userId : false;
		if (showDeleteButton) {
			return (
				<a style={{}} onClick={this.handleDeleteRequest} className="btn-floating btn-large red right">
					<i className="large material-icons">delete</i>
				</a>
			);
		}
		return null;
	}

	render() {
		const { currentRequest, auth } = this.props;
		const showForm = this.props.auth ? true : false;
		if (currentRequest && auth !== null) {
			return (
				<div className="row">
					<div className="col s12 m12">
						<div className="card light-blue accent-1">
							<div className="card-content white-text">
								<div
									style={{
										display: 'block',
										position: 'absolute',
										right: '20px',
									}}
									className={'right'}>
									{this.renderDeleteButton()}
								</div>
								<h4 className="center">
									<a href={currentRequest.sourceArtistUrl} style={{ color: 'white' }} target="blank">
										<span style={{ cursor: 'pointer' }}>{currentRequest.sourceArtist} </span>
									</a>-
									<a href={currentRequest.songUrl} style={{ color: 'white' }} target="blank">
										<span> {currentRequest.sourceTrack}</span>
									</a>
								</h4>
								<h4 className="center">
									{currentRequest.recipe}ed by{' '}
									<a href={currentRequest.targetArtistUrl} style={{ color: 'white' }} target="blank">
										<span style={{ fontWeight: 'bold' }}>{currentRequest.targetArtist}</span>
									</a>{' '}
									or anyone else
								</h4>
								<h4 className="center">
									<div className="chip" style={{ color: 'black', backgroundColor: 'white' }}>
										#{currentRequest.flavour}
									</div>
								</h4>

								<div className={'center'}>
									<p>
										<span>
											<i className={'material-icons'}>audiotrack</i>
										</span>
									</p>
									{showForm && (
										<VoteButtons
											request={currentRequest}
											user={this.props.auth}
											fetchOption={'single'}
										/>
									)}
									<p className={'center'} style={{ verticalAlign: 'middle' }}>
										<span className={'valign-wrapper center'} style={{ display: 'inline-block' }}>
											<i className={'material-icons'} style={{ verticalAlign: 'middle' }}>
												arrow_upward
											</i>: {currentRequest.upvotes}
										</span>
										<span style={{ padding: '0 10px' }}>|</span>
										<span className={'valign-wrapper'} style={{ display: 'inline-block' }}>
											<i className={'material-icons'} style={{ verticalAlign: 'middle' }}>
												arrow_downward
											</i>: {currentRequest.downvotes}
										</span>
									</p>
								</div>
								<div className="center">
									<div>
										<span className={`imageholder`}>
											<a href={currentRequest.sourceArtistUrl || ''} target="blank">
												<img
													className={'circle responsive-img overlay image'}
													alt={''}
													style={{
														border: '4px solid white',
														margin: '1em 2em ',
													}}
													src={currentRequest.sourceArtistImage}
												/>
												<div className={`middle`}>
													<div className={`text`}>{currentRequest.sourceArtist}</div>
												</div>
											</a>
										</span>
										<span className={`imageholder`}>
											<a href={currentRequest.targetArtistUrl || ''} target="blank">
												<img
													className={'circle responsive-img image'}
													alt={''}
													style={{
														border: '4px solid white',
														margin: '1em 2em ',
													}}
													src={currentRequest.targetArtistImage}
												/>
												<div className={`middle`}>
													<div className={`text`}>{currentRequest.targetArtist}</div>
												</div>
											</a>
										</span>
									</div>
								</div>
								<div className="card-content">
									<span className="card-title center">{`"${currentRequest.message}"`}</span>
									<span className="card-title center">
										submitted by {get(currentRequest, 'author.username', '')}, on{' '}
										{currentRequest &&
											currentRequest.createdAt &&
											new Date(currentRequest.createdAt).toLocaleDateString('fr-FR')}.
									</span>
								</div>
							</div>
						</div>
						<div className="row">
							{!showForm && (
								<Notice
									title={'Browsing as guest'}
									content={
										'You are currently browsing as guest' +
										" so you won't be able to vote for requests, comment, vote for comments, reply or vote for replies"
									}
								/>
							)}
							{showForm && (
								<form className="col s12" onSubmit={this.handleSubmitComment}>
									<div className="row">
										<div className="input-field col s10">
											<i className="material-icons prefix">account_circle</i>
											<textarea
												id="icon_prefix"
												rows={'10'}
												type="text"
												style={{ border: '2px black solid', borderRadius: '5px' }}
												placeholder="Your comment, be nice..."
												value={this.state.comment}
												onChange={this.handleChange}
												className="validate"
											/>
										</div>
										<div className="input-field col s12 m2 l2 center">
											<Button
												disabled={this.state.comment.length === 0}
												variant="raised"
												color="primary"
												type="submit">
												Add a comment
											</Button>
										</div>
									</div>
								</form>
							)}
							<div className="col s12">{`${this.props.comments.length} comments, so far !`}</div>
						</div>
						{this.renderComments()}
					</div>
				</div>
			);
		} else {
			return (
				<div className={'center'}>
					<PulseLoader color="#26A65B" size="16px" margin="4px" />
				</div>
			);
		}
	}
}

export default RequestDetails;
