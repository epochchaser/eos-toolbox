import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'
import { format } from 'date-fns'

@inject('explorerStore')
@observer
class AccountView extends Component {
  constructor(props) {
    super(props)
    let { explorerStore } = this.props
    this.explorerStore = explorerStore
  }

  render() {
    const stakeEos = this.explorerStore.account.stake
    const unstakeEos = this.explorerStore.account.unstake
    const refundEos = this.explorerStore.account.refund
    const totalEos = stakeEos + unstakeEos + refundEos
    const usageEosRate = (stakeEos / totalEos) * 100

    const cpuUsed = this.explorerStore.account.cpu_limit.used
    const cpuAvailable = this.explorerStore.account.cpu_limit.available
    const cpuMax = this.explorerStore.account.cpu_limit.max
    const usageCpuRate = (cpuUsed / cpuMax) * 100

    const netUsed = this.explorerStore.account.net_limit.used
    const netAvailable = this.explorerStore.account.net_limit.available
    const netMax = this.explorerStore.account.net_limit.max
    const usageNetRate = (netUsed / netMax) * 100

    const ramUsed = this.explorerStore.account.ram_usage
    const ramMax = this.explorerStore.account.ram_quota
    const ramAvailable = ramMax - ramUsed
    const usageRamRate = (ramUsed / ramMax) * 100

    const availableEosChartStyle = {
      width: `${usageEosRate.toFixed(0)}%`
    }

    const availableCpuChartStyle = {
      width: `${usageCpuRate.toFixed(0)}%`
    }

    const availableRamChartStyle = {
      width: `${usageRamRate.toFixed(0)}%`
    }

    const availableNetChartStyle = {
      width: `${usageNetRate.toFixed(0)}%`
    }

    return (
      <Fragment>
        <div className="row">
          <div className="col-lg-6 col-xl-4 col-md-12 m-b-30">
            <div className="card user-card">
              <div className="card-header">
                <h5>
                  <FormattedMessage id="Profile" />
                </h5>
              </div>
              <div className="card-block">
                <div className="usre-image">
                  <img
                    src="https://steemitimages.com/DQmeY3HLRU3Q2dhKgdqcuj52sbw7wdQdBvzzCjP2s2izNdU/2017-05-11%20(2).png"
                    className="img-radius"
                    alt="EOS Logo"
                    style={{ width: '100px', height: '100px' }}
                  />
                </div>
                <h6 className="f-w-600 m-t-25 m-b-10">{this.explorerStore.account.account_name}</h6>
                <p className="text-muted">
                  <FormattedMessage id="Created" />{' '}
                  {format(new Date(this.explorerStore.account.created), 'YYYY-MM-DD HH:mm:ss.SSS')}
                </p>
                <hr />
                <p className="text-muted m-t-15">
                  Total :{' '}
                  <NumberFormat
                    value={this.explorerStore.account.total.toFixed(4)}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={' EOS'}
                  />
                </p>
                <div className="bg-c-blue counter-block m-t-10 p-20">
                  <div className="row">
                    <div className="col-4">
                      <p>Unstake</p>
                      <p>
                        <NumberFormat
                          value={this.explorerStore.account.unstake.toFixed(4)}
                          displayType={'text'}
                          thousandSeparator={true}
                          suffix={' EOS'}
                        />
                      </p>
                    </div>
                    <div className="col-4">
                      <p>Stake</p>
                      <p>
                        <NumberFormat
                          value={this.explorerStore.account.stake.toFixed(4)}
                          displayType={'text'}
                          thousandSeparator={true}
                          suffix={' EOS'}
                        />
                      </p>
                    </div>
                    <div className="col-4">
                      <p>Refund</p>
                      <p>
                        <NumberFormat
                          value={this.explorerStore.account.refund.toFixed(4)}
                          displayType={'text'}
                          thousandSeparator={true}
                          suffix={' EOS'}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-xl-4">
            <div className="row">
              <div className="col-md-12">
                <div className="card statustic-card">
                  <div className="card-header">
                    <h5>
                      <FormattedMessage id="EOS Available" />
                    </h5>
                  </div>
                  <div className="card-block text-center">
                    <span className="d-block text-c-pink f-36">
                      <NumberFormat
                        value={unstakeEos.toFixed(4)}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' EOS'}
                      />
                    </span>
                    <div className="progress">
                      <div className="progress-bar bg-c-pink" style={availableEosChartStyle} />
                    </div>
                  </div>
                  <div className="card-footer bg-c-pink">
                    <h6 className="text-white m-b-0">
                      <FormattedMessage id="Staked" />{' '}
                      <NumberFormat
                        value={stakeEos.toFixed(4)}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' EOS'}
                      />{' '}
                      /{' '}
                      <NumberFormat
                        value={totalEos.toFixed(4)}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' EOS'}
                      />{' '}
                      EOS ({`${usageEosRate.toFixed(2)}%`})
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card statustic-card">
                  <div className="card-header">
                    <h5>
                      <FormattedMessage id="CPU Available" />
                    </h5>
                  </div>
                  <div className="card-block text-center">
                    <span className="d-block text-c-green f-36">
                      <NumberFormat
                        value={cpuAvailable}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' µs'}
                      />
                    </span>
                    <div className="progress">
                      <div className="progress-bar bg-c-green" style={availableCpuChartStyle} />
                    </div>
                  </div>
                  <div className="card-footer bg-c-green">
                    <h6 className="text-white m-b-0">
                      <FormattedMessage id="Usaged" />{' '}
                      <NumberFormat
                        value={cpuUsed}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' µs'}
                      />{' '}
                      /{' '}
                      <NumberFormat
                        value={cpuMax}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' µs'}
                      />{' '}
                      ({`${usageCpuRate.toFixed(2)}%`})
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-xl-4">
            <div className="row">
              <div className="col-md-12">
                <div className="card statustic-card">
                  <div className="card-header">
                    <h5>
                      <FormattedMessage id="RAM Available" />
                    </h5>
                  </div>
                  <div className="card-block text-center">
                    <span className="d-block text-c-blue f-36">
                      <NumberFormat
                        value={(ramAvailable / 1024).toFixed(4)}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' KB'}
                      />
                    </span>
                    <div className="progress">
                      <div className="progress-bar bg-c-blue" style={availableRamChartStyle} />
                    </div>
                  </div>
                  <div className="card-footer bg-c-blue">
                    <h6 className="text-white m-b-0">
                      <FormattedMessage id="Usaged" />{' '}
                      <NumberFormat
                        value={(ramUsed / 1024).toFixed(4)}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' KB'}
                      />{' '}
                      /{' '}
                      <NumberFormat
                        value={(ramMax / 1024).toFixed(4)}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' KB'}
                      />{' '}
                      ({`${usageRamRate.toFixed(2)}%`})
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card statustic-card">
                  <div className="card-header">
                    <h5>
                      <FormattedMessage id="NET Available" />
                    </h5>
                  </div>
                  <div className="card-block text-center">
                    <span className="d-block text-c-yellow f-36">
                      <NumberFormat
                        value={(netAvailable / 1024).toFixed(4)}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' KB'}
                      />
                    </span>
                    <div className="progress">
                      <div className="progress-bar bg-c-yellow" style={availableNetChartStyle} />
                    </div>
                  </div>
                  <div className="card-footer bg-c-yellow">
                    <h6 className="text-white m-b-0">
                      <FormattedMessage id="Usaged" />{' '}
                      <NumberFormat
                        value={(netUsed / 1024).toFixed(4)}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' KB'}
                      />{' '}
                      /{' '}
                      <NumberFormat
                        value={(netMax / 1024).toFixed(4)}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' KB'}
                      />{' '}
                      ({`${usageNetRate.toFixed(2)}%`})
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div class="card">
              <div class="card-header">
                <h5>Actions</h5>
                <span>EOS Network Actoins</span>
              </div>
              <div class="card-block">
                <div class="dt-responsive table-responsive">
                  <table id="base-style" class="table table-striped table-bordered nowrap">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>TYPE</th>
                        <th>MESSAGE</th>
                        <th>TRANSACTION</th>
                        <th>DATE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>7852145</td>
                        <td>write</td>
                        <td>CPU: 0.1 EOS / NET: 0 EOS</td>
                        <td>396c0f126ae9d5b10c2d0d7bd66ed7bc3363bf89b4e85cf45a0de24e7e335833</td>
                        <td>2018-06-06 12:10:00.000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default AccountView
