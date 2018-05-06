import React, { Component } from 'react';
import CustomizedTable from './CustomizedTable';
class RequestList extends Component {
	componentDidMount() {
		this.props.fetchRequests();
	}
	render() {
		if (this.props.requests && Object.keys(this.props.requests).length > 0) {
			return (
				<CustomizedTable
				{...this.props}
				/>
			);
		} else {
			return (
				<div className={'container'}>
					<p
						style={{
							color: 'white',
							height: '100%',
						}}>
						No tracks requests yet{' '}
					</p>{' '}
				</div>
			);
		}
	}
}

export default RequestList;
