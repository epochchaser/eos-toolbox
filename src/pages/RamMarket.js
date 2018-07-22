import React, { Component, Fragment } from 'react'
import RamMarketChartView from '../components/account/ram/RamMarketChartView'
import RamTradingView from '../components/account/ram/RamTradingView'
import RamStatusView from '../components/account/ram/RamStatusView'
import NeedLoginView from '../components/NeedLoginView'
import { inject, observer } from '../../node_modules/mobx-react'

@inject('accountStore', 'commonStore')
@observer
class RamMarket extends Component {
  constructor(props) {
    super(props)
    const { commonStore, accountStore } = this.props
    this.commonStore = commonStore
    this.accountStore = accountStore
  }

  render() {
    return (
      <div>
        {this.accountStore &&
          this.accountStore.accountInfo && (
            <Fragment>
              <div className="page-wrapper">
                <div className="page-body">
                  <RamMarketChartView />

                  <div className="row">
                    <RamStatusView />
                  </div>
                  <div className="row">
                    <RamTradingView />
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        {!this.commonStore.isLoading && !this.accountStore.isLogin && <NeedLoginView />}
      </div>
    )
  }
}

export default RamMarket
