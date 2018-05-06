import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

const styles = (theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	icon: {
		// margin: theme.spacing.unit * 2,
	},
	iconHover: {
		// margin: theme.spacing.unit * 2,
		'&:hover': {
			color: green[200],
		},
	},
});

{
	/*<Icon className={classes.iconHover} style={{ fontSize: 20 }} onClick={()=>props.handleClick(props.user._id,props.request._id,props.fetchOption)}>
        arrow_upward
  </Icon>*/
}

const Upvote = (props) => {
	const { classes } = props;
	return (
		<IconButton
			color="primary"
			className={classes.button}
			aria-label="Upvote"
			disabled={!props.auth}
			style={{ fontSize: 20 }}
			onClick={() => props.handleClick(props.user._id, props.request._id, props.fetchOption)}>
			<Icon>arrow_upward</Icon>
		</IconButton>
	);
};

Upvote.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Upvote);
