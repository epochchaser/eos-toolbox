import React, { Component, Fragment } from 'react'
import SearchResult from '../components/blockexplorer/SearchResult'
import SearchView from '../components/blockexplorer/SearchView'

class BlockExplorer extends Component {
  render() {
    return (
      <Fragment>
        <div className="page-wrapper">
          <div className="page-body">
            <div className="row">
              <SearchView />
            </div>
            <div className="row">
              <SearchResult />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default BlockExplorer
