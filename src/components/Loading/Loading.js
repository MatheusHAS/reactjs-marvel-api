import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
})

class Loading extends Component {
  render() {
    const { classes } = this.props
    return (
      <CircularProgress className={classes.progress} />
    )
  }
}

Loading.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(Loading)
