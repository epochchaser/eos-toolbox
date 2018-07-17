import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'
import { inject, observer } from 'mobx-react'

class MyResourceView extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <div className="card statustic-card">
            <div className="card-header">
              <h5>
                <FormattedMessage id="Total Staking" />
              </h5>
            </div>
            <div className="card-block text-center">
              <span className="d-block text-c-blue f-36" />
              <div className="progress" />
            </div>
            <div className="card-footer bg-c-blue">
              <h6 className="text-white m-b-0" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card statustic-card">
            <div className="card-header">
              <h5>
                <FormattedMessage id="Ram Buying" />
              </h5>
            </div>
            <div className="card-block text-center">
              <span className="d-block text-c-pink f-36" />
              <div className="progress" />
            </div>
            <div className="card-footer bg-c-pink">
              <h6 className="text-white m-b-0" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MyResourceView
