import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Loading from './../Loading/Loading'
import { endpoint, apikey } from './../../configs'

import './CharactersList.css'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    maxWidth: '100%',
    height: '100%',
  },
  icon: {
    color: 'white',
  },
});

const _onCharacterClick = (id) => {
  console.log('Click on', id)
}

const characterItem = (props) => <GridListTile key={props.index}>
    <LazyLoadImage
      src={props.image}
      alt={props.name}
      height='100%'
    />
    <GridListTileBar
      title={props.name}
      subtitle={<span>{props.subtitle}</span>}
      actionIcon={
        <IconButton onClick={(event) => _onCharacterClick(props.index, event)}  className={props.icon}>
          <InfoIcon />
        </IconButton>
      }
    />
  </GridListTile>

class CharactersList extends React.Component {

  constructor() {
    super()
    this.state = {
      characters: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    fetch(`${endpoint}/v1/public/characters?${apikey}`, { method: 'GET' })
      .then(result => result.json())
      .then(response => this.setState({characters: response.data.results, isLoading: false}))
  }

  render() {
    const { classes } = this.props;
    let content = null
    const loading = <Loading/>
    if (!this.state.isLoading) {
      content = this.state.characters.map(character => characterItem({
        index: character.id,
        image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
        name: character.name,
        icon: classes.icon,
      }))
    }
    return (
      <Fragment>
        {
          (this.state.isLoading) ? loading : 
          <div className={classes.root}>
            <GridList cellHeight={250} className={classes.gridList} data-grid-item>
              {content}
            </GridList>
          </div>
        }
      </Fragment>
    );
  }
  
}

export default withStyles(styles)(CharactersList);