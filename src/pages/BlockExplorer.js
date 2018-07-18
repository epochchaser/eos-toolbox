import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import SearchResult from '../components/blockexplorer/SearchResult'
import SearchView from '../components/blockexplorer/SearchView'

class BlockExplorer extends Component {
  render() {
    return (
      <Fragment>
        <div className="page-wrapper">
          <div className="page-body">
            <div className="row">
              <SearchView
                query={this.props.match.params.query}
                history={this.props.history}
                pathname={this.props.location.pathname}
              />
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

export default withRouter(BlockExplorer)
