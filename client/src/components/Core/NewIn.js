import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    height:'320px'
  },
  title: {
    // color: theme.palette.primary.light,
    color: 'red',
  },
  title2: {
    // color: theme.palette.primary.light,
    marginBottom:'200px',
    color: 'white',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  img:{
    borderTopLeftRadius:'20px',
    borderTopRightRadius:'20px',
  }
});

const NewIn = props => {
  const { classes, suggestions } = props;
if(!suggestions.length){
  return null;
}else{
  return (
    <div className={classes.root}>
  {/*<h4>Browse the latest tracks requests</h4>*/}
      <GridList className={classes.gridList} cols={2.5}>
        {suggestions.map(suggestion => (
          <Link to={`/request/${suggestion._id}`} key={suggestion._id}>
          <GridListTile key={suggestion._id}>
          <p>{`${suggestion.sourceTrack.substring(0,20)}...`}</p>
            <img className={classes.img} src={suggestion.sourceArtistImage} alt={suggestion.sourceArtist} />
            <GridListTileBar
            title={`${suggestion.targetArtist}`}
            classes={{
              root: classes.titleBar,
              title: classes.title2,
            }}
            />
            <GridListTileBar
            title={`${suggestion.sourceArtist}`}
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            />
            </GridListTile>
            </Link>
          ))}
          </GridList>
          </div>
  );
}

};

NewIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewIn);
