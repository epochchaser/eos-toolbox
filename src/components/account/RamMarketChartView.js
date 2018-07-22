import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

class RamMarketChartView extends Component {
  render() {
    return (
      <div className="col-sm-12">
        <div className="card">
          <div className="card-block">
            <div className="row">
              <div className="col-lg-6 offset-lg-3 m-t-10">
                <h5 className="txt-highlight text-center">
                  <FormattedMessage id="EOS Block Explorer" />
                </h5>
                <p className="text-muted text-center m-t-20">
                  <FormattedMessage id="Search with account, public key, transaction id, block number" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RamMarketChartView
