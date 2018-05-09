import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { withRouter } from 'react-router-dom';
import VoteButtons from '../../../Core/VoteButtons';
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


const CustomizedTable = props => {
  const { classes, requests, auth } = props;
  const handleCellClick = (id, props) => {
    props.history.push(`/request/${id}`);
  };

  return (
    <Paper className={classes.root}>
    <Table
      className={classes.table}
      >
        <TableHead>
          <TableRow>
            <CustomTableCell className={classes.head}>Votes</CustomTableCell>
            <CustomTableCell className={classes.head}>Source Song</CustomTableCell>
            <CustomTableCell className={classes.head}>Source Artist</CustomTableCell>
            <CustomTableCell className={classes.head}>Recipe</CustomTableCell>
            <CustomTableCell className={classes.head}>Target Artist</CustomTableCell>
            <CustomTableCell className={classes.head}>Flavour</CustomTableCell>
            <CustomTableCell className={classes.head}>Status</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map(request => {
            return (
              <TableRow hover className={classes.row} key={request._id}>
                <CustomTableCell>
                <VoteButtons
                  request={request}
                  user={auth}
                  />
                </CustomTableCell>
                <CustomTableCell
                  onClick={handleCellClick.bind(this, request._id, props)}
                >
                  {request.sourceTrack}
                </CustomTableCell>
                <CustomTableCell
                  onClick={handleCellClick.bind(this, request._id, props)}
                >
                  {request.sourceArtist}
                </CustomTableCell>
                <CustomTableCell
                  onClick={handleCellClick.bind(this, request._id, props)}
                >
                  {request.recipe}
                </CustomTableCell>
                <CustomTableCell
                  onClick={handleCellClick.bind(this, request._id, props)}
                >
                  {request.targetArtist}
                </CustomTableCell>
                <CustomTableCell
                  onClick={handleCellClick.bind(this, request._id, props)}
                >
                  {request.flavour}
                </CustomTableCell>
                <CustomTableCell
                  onClick={handleCellClick.bind(this, request._id, props)}
                >
                  {request.status}
                </CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

    </Paper>
  );
};

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(CustomizedTable));
