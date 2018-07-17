import React, { Component, Fragment } from 'react'
import MyResourceView from '../components/account/MyResourceView'

class Undelegate extends Component {
  render() {
    return (
      <Fragment>
        <div className="page-wrapper">
          <div className="page-body">
            <div className="row">
              <MyResourceView />
            </div>
            <div className="row" />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Undelegate
