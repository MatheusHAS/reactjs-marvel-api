import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class Loading extends Component {
  render() {
    const { classes } = this.props;
    return (
      <CircularProgress className={classes.progress} />
    )
  }
}

export default withStyles(styles)(Loading);
