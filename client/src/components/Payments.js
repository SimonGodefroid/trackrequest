import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';
class Payments extends Component {
	render() {
		return (
			<StripeCheckout
				amount={500} // cents = 5 dollars
				token={token => {
					this.props.handleToken(token);
				}}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
				name={`Emaily`}
				description={`$5 for 5 email credits`}
			>
				<a className="waves-effect waves-light btn">Add Credits</a>
			</StripeCheckout>
		);
	}
}

export default connect(null, actions)(Payments);
