import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { endpoint, apikey } from './../../configs'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

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
      loading: true,
    }
  }

  componentDidMount() {
    fetch(`${endpoint}/v1/public/comics?${apikey}`, { method: 'GET' })
      .then(result => result.json())
      .then(response => {
        this.setState({comics: response.data.results, loading: false})
      })
  }

  render() {
    const { classes } = this.props;
    let comics = null;
    const loading = <CircularProgress className={classes.progress} />
    if (this.state.loading) {
      comics = <CircularProgress className={classes.progress} />
    } else {
      comics = (this.state.comics.length !== 0) ? this.state.comics.map((comic) => comicItem({
        index: comic.id,
        image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
        text: comic.title,
      })) : <h1>Não houve dados para listagem...</h1>
    }

    return (
      (this.state.loading) ? loading : 
      <Fragment>
        <List dense className={classes.root}>
          {comics}
        </List>
      </Fragment>      
    );
  }
}

export default withStyles(styles)(ComicsList);