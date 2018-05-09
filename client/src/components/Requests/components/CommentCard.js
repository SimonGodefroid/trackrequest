import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Card, {
	CardActions,
	CardHeader,
	CardContent,
} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import CustomizedChip from './CustomizedChip';
import get from 'lodash/get';

const styles = {
	card: {
		// maxWidth: 345,
	},
	media: {
		paddingTop: '56.25%', // 16:9
	},
};

const CommentCard = (props) => {
	const { classes } = props;
	const showDeleteButton = props.comment.author._id === props.auth._id;
	const showReplyButton = props.auth ? true : false;
	return (
		<Card>
			<CardHeader
				title={moment(props.comment.createdAt).format(
					'DD/MM/YYYY-hh:mm:ss'
				)}
				avatar={<CustomizedChip user={props.comment.author} />}
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
									get(props.comment, 'votes.upvotes', {})
								).length
							}
						</span>
						<a
							className="waves-effect waves-teal btn-flat"
							style={{ color: 'black' }}>
							<i
								className="material-icons"
								onClick={this.handleUpvote}>
								arrow_upward
							</i>
						</a>
						<br />
						<span style={{ color: 'red' }}>
							{
								Object.keys(
									get(props.comment, 'votes.downvotes', {})
								).length
							}
						</span>
						<a
							className="waves-effect waves-teal btn-flat"
							style={{ color: 'black', display: 'inline-block' }}>
							<i
								className="material-icons"
								onClick={this.handleDownvote}>
								arrow_downward
							</i>
						</a>
					</div>
					<div style={{ float: 'left' }}>
						<p>{props.comment.content}</p>
					</div>
				</div>
			</CardContent>
			<CardActions style={{ float: 'right' }}>
				{showReplyButton && (
					<Button
						size="small"
						color="primary"
						onClick={props.handleClickReplyButtonFn}>
						Reply
					</Button>
				)}
				{showDeleteButton && (
					<Button
						size="small"
						color="secondary"
						onClick={props.handleDeleteComment}>
						Delete
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

CommentCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentCard);
