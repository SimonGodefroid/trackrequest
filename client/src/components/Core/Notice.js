import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = (theme) => ({
	root: theme.mixins.gutters({
		paddingTop: 16,
		paddingBottom: 16,
		marginTop: theme.spacing.unit * 3,
	}),
});

const PaperSheet = (props) => {
	const { classes } = props;
	return (
		<div>
			<Paper className={classes.root} elevation={4}>
				<Typography variant="headline" component="h3">
					{props.title}
				</Typography>
				<Typography component="p">
					{props.content}
				</Typography>
			</Paper>
		</div>
	);
};

PaperSheet.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
