import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { PulseLoader } from 'halogenium';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
    backgroudColor:'white',
  },
});


 const handleClick = () => {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

const Chips = (props) =>{
  const { classes } = props;
  if(props.user){
    return (
      <div className={classes.root}>
        <Chip
          avatar={<Avatar src={props.user.avatar} alt={`${props.user.username} profile`}/>}
          label={`${props.user.username.substring(0, 5)}...`}
          onClick={handleClick}
          className={classes.chip}
        />
      </div>
    );
  }
else{
  return <PulseLoader/>
}
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chips);
