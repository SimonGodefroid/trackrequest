import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { InputAdornment } from 'material-ui/Input';
import TextField from 'material-ui/TextField';

import AvatarCustom from '../Core/AvatarCustom';

const styles = (theme) => ({
	margin: {
		margin: theme.spacing.unit,
	},
});

class TextArea extends React.Component {

	render(){
		const { classes } = this.props;
		return (
			<div>
				<TextField
					fullWidth
					placeholder={this.props.placeholder}
					onChange={this.props.handleChange}
					className={classes.margin}
					id="input-with-icon-textfield"
					multiline
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<AvatarCustom user={this.props.user} />
							</InputAdornment>
						),
					}}
				/>
			</div>
		);
	}

};

TextArea.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextArea);
