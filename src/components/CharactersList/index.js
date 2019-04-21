import React, { useState, useEffect } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Loading from '../Loading'
import { endpoint, apikey } from '../../configs'

import './CharactersList.css'
const styles = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    maxWidth: '100%',
    height: '100%',
  },
  icon: {
    color: 'white',
  },
})

export default function CharactersList() {
  const [characters, setCharacters] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function getCharacterList() {
      await fetch(`${endpoint}/v1/public/characters?${apikey}`, { method: 'GET' })
        .then(result => result.json())
        .then(response => {
          setCharacters(response.data.results)
          setLoading(!isLoading)
        })
    }
    getCharacterList()

  }, [])

  function _onCharacterClick(id) {
    console.log('Click on', id)
  }

  return(
    <MuiThemeProvider theme={styles}>
      {
        (isLoading) ? <Loading/> : 
        <div className='root'>
          <GridList cellHeight={250} className='gridList' data-grid-item>
            {characters.map(character => <GridListTile key={character.id}>
              <LazyLoadImage
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                height='100%'
              />
              <GridListTileBar
                title={character.name}
                subtitle={<span>{}</span>}
                actionIcon={
                  <IconButton onClick={(event) => _onCharacterClick(character.id, event)}  className='icon'>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>)}
          </GridList>
        </div>
      }
    </MuiThemeProvider>
  )
}