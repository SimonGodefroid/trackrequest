import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'material-ui/Button';
import { InputAdornment } from 'material-ui/Input';
import TextField from 'material-ui/TextField';

import * as actionCreators from '../modules/actions';
import AvatarCustom from '../../Core/AvatarCustom';

class ReplyForm extends Component {
	state = {
		reply: '',
	};

	handleChange = (evt) => {
		this.setState({ reply: evt.target.value });
	};

	handleSubmitReply = (e) => {
		e.preventDefault();
		this.setState({ reply: '' });
		this.props.toggleFormVisibility();
		const { comment, auth, currentRequest } = this.props;
		this.props
			.postReply(
				auth._id,
				currentRequest._id,
				comment._id,
				this.state.reply
			)
			.then(() => this.props.getComments(currentRequest._id));
	};

	render() {
		return (
			<form className="col s12" onSubmit={this.handleSubmit}>
				<div className="row">
					<div className="col s8">
						<div style={{ margin: '10px' }}>
							<TextField
								fullWidth
								placeholder={'Your reply, please be nice'}
								onChange={this.handleChange}
								value={this.state.reply}
								id="input-with-icon-textfield"
								multiline
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<AvatarCustom
												user={this.props.auth}
											/>
										</InputAdornment>
									),
								}}
							/>
						</div>
					</div>
					<div className="input-field col s12 m4 l4 center">
						<Button
							size="small"
							disabled={this.state.reply.length === 0}
							type="submit"
							color="primary"
							onClick={this.handleSubmitReply}>
							Post reply
						</Button>
						<Button
							size="small"
							type="submit"
							color="secondary"
							onClick={this.props.handleClickReplyButtonFn}>
							Cancel
						</Button>
					</div>
				</div>
			</form>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	comments: state.requests.comments,
	currentRequest: state.requests.currentRequest,
	message: state.message,
});
const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ ...actionCreators }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ReplyForm);
