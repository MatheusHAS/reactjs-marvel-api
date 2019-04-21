import React, { Component, Fragment } from 'react'
import ComicsList from '../ComicsList'

export default class ComicsListPage extends Component {
  render() {
    return (
      <Fragment>
        <h1>Comics List</h1>
        <ComicsList/>
      </Fragment>
    )
  }
}
