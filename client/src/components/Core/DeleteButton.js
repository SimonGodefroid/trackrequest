import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from 'material-ui/Icon';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = (theme) => ({
	button: {
		margin: theme.spacing.unit,
	},
});

const FloatingActionButtons = (props) => {
	const { classes } = props;
	return (
		<div>
			<Button variant="fab" disabled aria-label="delete" className={classes.button}>
				<DeleteIcon />
			</Button>
		</div>
	);
};

FloatingActionButtons.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);
