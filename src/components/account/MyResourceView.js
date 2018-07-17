import React, { Component, Fragment } from 'react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'
import { inject, observer } from 'mobx-react'

@inject('accountStore')
@observer
class MyResourceView extends Component {
  render() {
    const { accountStore } = this.props

    const cpuPercent = accountStore.cpu_max
      ? `${((accountStore.cpu_staked / accountStore.cpu_max) * 100).toFixed(2)}%`
      : '0%'
    const netPercent = accountStore.net_max
      ? `${((accountStore.net_staked / accountStore.net_max) * 100).toFixed(2)}%`
      : '0%'

    const offset = accountStore.totalBalance - accountStore.staked
    const unstakingPercent = accountStore.totalBalance
      ? `${((offset / accountStore.totalBalance) * 100).toFixed(2)}%`
      : '0%'

    const liquidPercent = accountStore.liquid
      ? `${((accountStore.liquid / accountStore.totalBalance) * 100).toFixed(2)}%`
      : '0%'

    const cpuChartStyle = {
      width: cpuPercent
    }
    const netChartStyle = {
      width: netPercent
    }

    const unstakingChartStyle = {
      width: unstakingPercent
    }

    const liquidChartStyle = {
      width: liquidPercent
    }

    return (
      <Fragment>
        <div className="row">
          <div className="col-md-6">
            <div className="card statustic-card">
              <div className="card-header">
                <h5>
                  <FormattedMessage id="CPU Staked" />
                </h5>
              </div>
              <div className="card-block text-center">
                <span className="d-block text-c-blue f-36">
                  <NumberFormat
                    value={cpuPercent}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={'%'}
                  />
                </span>
                <div className="progress">
                  <div className="progress-bar bg-c-blue" style={cpuChartStyle} />
                </div>
              </div>
              <div className="card-footer bg-c-blue">
                <h6 className="text-white m-b-0">{accountStore.cpu_staked} EOS</h6>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card statustic-card">
              <div className="card-header">
                <h5>
                  <FormattedMessage id="NET Staked" />
                </h5>
              </div>
              <div className="card-block text-center">
                <span className="d-block text-c-blue f-36">
                  <NumberFormat
                    value={netPercent}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={'%'}
                  />
                </span>
                <div className="progress">
                  <div className="progress-bar bg-c-blue" style={netChartStyle} />
                </div>
              </div>
              <div className="card-footer bg-c-blue">
                <h6 className="text-white m-b-0">{accountStore.net_staked} EOS</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card statustic-card">
              <div className="card-header">
                <h5>
                  <FormattedMessage id="Unstaking" />
                </h5>
              </div>
              <div className="card-block text-center">
                <span className="d-block text-c-yellow f-36">
                  <NumberFormat
                    value={unstakingPercent}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={'%'}
                  />
                </span>
                <div className="progress">
                  <div className="progress-bar bg-c-yellow" style={unstakingChartStyle} />
                </div>
              </div>
              <div className="card-footer bg-c-yellow">
                <h6 className="text-white m-b-0">
                  {accountStore.totalBalance - accountStore.staked} EOS
                </h6>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card statustic-card">
              <div className="card-header">
                <h5>
                  <FormattedMessage id="Liquid" />
                </h5>
              </div>
              <div className="card-block text-center">
                <span className="d-block text-c-pink f-36">
                  <NumberFormat
                    value={liquidPercent}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={'%'}
                  />
                </span>
                <div className="progress">
                  <div className="progress-bar bg-c-pink" style={liquidChartStyle} />
                </div>
              </div>
              <div className="card-footer bg-c-pink">
                <h6 className="text-white m-b-0">{accountStore.liquid} EOS</h6>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default MyResourceView
