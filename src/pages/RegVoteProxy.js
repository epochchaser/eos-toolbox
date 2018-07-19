import React, { Component, Fragment } from 'react'
import RegVoteProxyView from '../components/voting/RegVoteProxyView'

class RegVoteProxy extends Component {
  render() {
    return (
      <Fragment>
        <div className="page-wrapper">
          <div className="page-body">
            <div className="row">
              <RegVoteProxyView />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default RegVoteProxy
