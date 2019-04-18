import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Loading from './../Loading/Loading'
import PropTypes from 'prop-types'
import { endpoint, apikey } from './../../configs'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
})

const _onComicClick = (id) => {
  console.log('Click on', id)
}

const comicItem = (props) => <ListItem key={props.index} onClick={(event) => _onComicClick(props.index, event)} button>
    <ListItemAvatar>
      <Avatar
          alt={`${(props.alt) ? props.alt : ''}`}
          src={`${props.image}`}
      />
    </ListItemAvatar>
    <ListItemText primary={`${props.text}`} />
  </ListItem>

class ComicsList extends React.Component {
  constructor() {
    super()
    this.state = {
      comics: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    fetch(`${endpoint}/v1/public/comics?${apikey}`, { method: 'GET' })
      .then(result => result.json())
      .then(response => this.setState({comics: response.data.results, isLoading: false}))
  }

  render() {
    const { classes } = this.props
    let comics = null
    const loading = <Loading/>
    if (!this.state.isLoading) {
      comics = (this.state.comics.length !== 0) ? this.state.comics.map((comic) => comicItem({
        index: comic.id,
        image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
        text: comic.title,
      })) : <h1>Não houve dados para listagem...</h1>
    }

    return (
      (this.state.isLoading) ? loading : 
      <Fragment>
        <List dense className={classes.root}>
          {comics}
        </List>
      </Fragment>      
    )
  }
}

comicItem.propTypes = {
  index: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  image: PropTypes.string,
  alt: PropTypes.string,
  text: PropTypes.string,
}

ComicsList.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(ComicsList)