import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
// import InfoIcon from '@material-ui/icons/Info';
// import tileData from './tileData';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
const TitlebarGridList = (props) =>{
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <Subheader component="div">LOOK THESE ARE ALREADY IN STORE !!!</Subheader>
        </GridListTile>
        {props.requests.map(req => (
          <GridListTile key={req._id}>
          <img onMouseOver={()=>console.log('COUCOU')} src={req.targetArtistImage} alt={req.sourceTrack} />
          <Link to={`/request/${req._id}`}>
            <GridListTileBar
              title={req.sourceTrack}
              subtitle={<div><span>from: {req.sourceArtist}</span><br/><span>{req.recipe}ed by: {req.targetArtist}</span></div>}
              // actionIcon={
                // <IconButton className={classes.icon}>
                 // <InfoIcon />
               // </IconButton>
              //}
              />
              </Link>
              </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);
