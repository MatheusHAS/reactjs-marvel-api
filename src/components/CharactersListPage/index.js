import React, { Component, Fragment } from 'react'
import CharactersList from '../CharactersList'

export default class CharactersListPage extends Component {
  render() {
    return (
      <Fragment>
        <h1>Characters List</h1>
        <CharactersList/>
      </Fragment>
    )
  }
}
