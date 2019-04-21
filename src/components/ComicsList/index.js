import React, { useEffect, useState } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Loading from '../Loading'
import { endpoint, apikey } from '../../configs'

const styles = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  root: {
    width: '100%',
  },
})

export default function ComicsList() {
  const [comics, setComics] = useState([])
  const [isLoading, setLoading] = useState(true)
  
  useEffect(() => {
    async function getComicsList() {
      await fetch(`${endpoint}/v1/public/comics?${apikey}`, { method: 'GET' })
        .then(result => result.json())
        .then(response => {
          setComics(response.data.results)
          setLoading(!isLoading)
        })
    }
    getComicsList()
  }, [])

  function _onComicClick(id) {
    console.log('Click on', id)
  }

  return(
    <MuiThemeProvider theme={styles}>
    {
      (isLoading) ? <Loading/> : 
      <>
        <List dense className='root'>     

          {(comics.length !== 0) ? comics.map((comic) => 
            <ListItem key={comic.id} onClick={(event) => _onComicClick(comic.id, event)} button>
              <ListItemAvatar>
                <Avatar
                    alt={''}
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                />
              </ListItemAvatar>
              <ListItemText primary={comic.title} />
            </ListItem>
          ) : <h1>Não houve dados para listagem...</h1>}

        </List>
      </>
    }
    </MuiThemeProvider>
  )
}