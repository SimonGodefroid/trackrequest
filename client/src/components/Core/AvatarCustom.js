import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
};

const AvatarCustom = (props) =>{
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Avatar alt={props.user.username} src={props.user.avatar} className={classes.avatar} />
    </div>
  );
}

AvatarCustom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AvatarCustom);
