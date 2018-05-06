import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import red from 'material-ui/colors/red';
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
			color: red[500],
		},
	},
});

{
	/*<Icon className={classes.iconHover} style={{ fontSize: 20, }} onClick={()=>props.handleClick(props.user._id,props.request._id,props.fetchOption)}>
        arrow_downward
</Icon>*/
}

const Downvote = (props) => {
	const { classes } = props;
	return (
		<IconButton
			color="secondary"
      className={classes.button}
      disabled={!props.auth}
			aria-label="Downvote"
			style={{ fontSize: 20 }}
			onClick={() => props.handleClick(props.user._id, props.request._id, props.fetchOption)}>
			<Icon>arrow_downward</Icon>
		</IconButton>
	);
};

Downvote.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Downvote);
