import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
// /2.0/?method=chart.gettoptracks&api_key=YOUR_API_KEY&format=json

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

const Suggestions = props => {
  const { classes, suggestions } = props;

  return (
    <div className={classes.root}>
    <h4>Get inspired by the top charts...</h4>
      <GridList className={classes.gridList} cols={2.5}>
        {suggestions.map(suggestion => (
          <a href={suggestion.url} target='blank' key={suggestion.name}>
          <GridListTile key={suggestion.name}>
            <img className={classes.img} src={suggestion.image[3]['#text']} alt={suggestion.name} />
            <GridListTileBar
            title={`${suggestion.artist.name} - ${suggestion.name}`}
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            />
            </GridListTile>
            </a>
          ))}
          </GridList>
          </div>
  );
};

Suggestions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Suggestions);
