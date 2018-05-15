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
  }
  handleClick = (evt) =>{
    evt.preventDefault();
    this.setState({showFormReply:!this.state.showFormReply});
  }
	render() {
		if (Object.keys(this.props.reply).length) {
			return (
        <div>
				<Card
					key={this.props.reply._id}
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
											get(this.props.reply, 'votes.upvotes', {})
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
											get(this.props.rep, 'votes.downvotes', {})
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
								<p>{this.props.reply.content}</p>
							</div>
						</div>
					</CardContent>
					<CardActions style={{ float: 'right' }}>
						{/*showReplyButton && (*/}
						<Button size="small" color="primary" onClick={this.handleClick}>
							Reply
						</Button>
						{/*)}*/}
						{/*showDeleteButton && (*/}
						<Button size="small" color="secondary">
							Delete
						</Button>
						{/*)}*/}
					</CardActions>
          <p>
          {this.state.showFormReply && (<ReplyForm />)}
          </p>
        </Card>
        </div>
			);
		}
	}
}

export default ReplyCard;
