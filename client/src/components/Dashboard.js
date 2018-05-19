import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RequestList from './Requests/RequestList';
import Paper from 'material-ui/Paper';
import Notice from './Core/Notice';
const Dashboard = (props) => {
	const showButton = props.auth ? true : false;
	return (
		<div>
			{!showButton && (
				<Notice
					title={'Browsing as guest'}
					content={
						'You are currently browsing as guest' +
						' so you won\'t be able to create requests or vote for existing ones'
					}
				/>
			)}
			{showButton && (
				<Notice
					title={'Requests List'}
					content={
						'You are currently viewing all the requests.' +
						' From here you can browse and upvote existing ones or create a new one'
					}
				/>
			)}
			<RequestList />
			{showButton && (
				<div className="fixed-action-btn">
					<Link to={`/requests/new`} className="btn-floating btn-large red">
						<i className="large material-icons">add</i>
					</Link>
				</div>
			)}
		</div>
	);
};
const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps)(Dashboard);
