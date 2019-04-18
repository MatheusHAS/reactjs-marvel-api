import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const tileData = [{
  image: '',
  name: 'Image',
  subtitle: 'author',
}]

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

const listItem = (props) => <GridListTile key={props.image}>
    <img src={props.image} alt={props.name} />
    <GridListTileBar
      title={props.name}
      subtitle={<span>{props.subtitle}</span>}
      actionIcon={
        <IconButton>
          <InfoIcon />
        </IconButton>
      }
    />
  </GridListTile>

function CharactersList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile>
        {tileData.map(item => (
          listItem(item)
        ))}
      </GridList>
    </div>
  );
}

export default withStyles(styles)(CharactersList);