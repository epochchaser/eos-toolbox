import React, { Component, Fragment } from 'react'
import RamMarketChartView from '../components/account/RamMarketChartView'
import RamTradingView from '../components/account/RamTradingView'
import RamStatusView from '../components/account/RamStatusView'
import { inject, observer } from '../../node_modules/mobx-react'

@inject('accountStore')
@observer
class RamMarket extends Component {
  render() {
    const { accountStore } = this.props

    return (
      accountStore &&
      accountStore.accountInfo && (
        <Fragment>
          <div className="page-wrapper">
            <div className="page-body">
              <div className="row">
                <RamMarketChartView />
              </div>

              <div className="row">
                <RamStatusView />
              </div>
              <div className="row">
                <RamTradingView />
              </div>
            </div>
          </div>
        </Fragment>
      )
    )
  }
}

export default RamMarket
