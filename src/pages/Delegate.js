import React, { Component, Fragment } from 'react'
import MyResourceView from '../components/account/MyResourceView'

class Delegate extends Component {
  render() {
    return (
      <Fragment>
        <div className="page-wrapper">
          <div className="page-body">
            <MyResourceView />
            <div className="row" />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Delegate
