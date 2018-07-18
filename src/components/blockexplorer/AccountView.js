import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
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

  componentDidMount = async () => {
    await this.explorerStore.getActions(this.explorerStore.account.account_name)
  }

  render() {
    const stakeEos = this.explorerStore.account.stake
    const unstakeEos = this.explorerStore.account.unstake
    const refundEos = this.explorerStore.account.refund
    const totalEos = stakeEos + unstakeEos + refundEos
    const usageEosRate = (stakeEos / totalEos) * 100

    const cpuUsed =
      this.explorerStore.account.cpu_limit.used > 0 ? this.explorerStore.account.cpu_limit.used : 0
    const cpuAvailable =
      this.explorerStore.account.cpu_limit.available > 0
        ? this.explorerStore.account.cpu_limit.available
        : 0
    const cpuMax =
      this.explorerStore.account.cpu_limit.max > 0 ? this.explorerStore.account.cpu_limit.max : 0
    const usageCpuRate = cpuMax > 0 ? (cpuUsed / cpuMax) * 100 : 0

    const netUsed =
      this.explorerStore.account.net_limit.used > 0 ? this.explorerStore.account.net_limit.used : 0
    const netAvailable =
      this.explorerStore.account.net_limit.available > 0
        ? this.explorerStore.account.net_limit.available
        : 0
    const netMax =
      this.explorerStore.account.net_limit.max > 0 ? this.explorerStore.account.net_limit.max : 0
    const usageNetRate = netMax > 0 ? (netUsed / netMax) * 100 : 0

    const ramUsed =
      this.explorerStore.account.ram_usage > 0 ? this.explorerStore.account.ram_usage : 0
    const ramMax =
      this.explorerStore.account.ram_quota > 0 ? this.explorerStore.account.ram_quota : 0
    const ramAvailable = ramMax - ramUsed
    const usageRamRate = ramMax > 0 ? (ramUsed / ramMax) * 100 : 0

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
              <div
                className="bg-c-blue counter-block m-t-10 p-15"
                style={{ height: '68px', paddingBottom: '10px' }}
              >
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
                    ({`${usageEosRate.toFixed(2)}%`})
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
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h5>
                <FormattedMessage id="Actions" />
              </h5>
              <span>EOS Network Actoins</span>
            </div>
            <div className="card-block">
              <div className="dt-responsive table-responsive">
                {this.explorerStore.isActionLoading && (
                  <div className="preloader3 loader-block m-t-20" style={{ height: '9px' }}>
                    <div className="circ1" />
                    <div className="circ2" />
                    <div className="circ3" />
                    <div className="circ4" />
                  </div>
                )}
                {this.explorerStore.actions &&
                  this.explorerStore.actions.length === 0 && (
                    <table id="base-style" className="table table-striped table-bordered nowrap">
                      <thead>
                        <tr>
                          <th>
                            <FormattedMessage id="ID" />
                          </th>
                          <th>
                            <FormattedMessage id="TYPE" />
                          </th>
                          <th>
                            <FormattedMessage id="DATA" />
                          </th>
                          <th>
                            <FormattedMessage id="TRANSACTION ID" />
                          </th>
                          <th>
                            <FormattedMessage id="DATE" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colsPan="5" className="text-center">
                            <FormattedMessage id="No Actions" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                {this.explorerStore.actions &&
                  this.explorerStore.actions.length > 0 && (
                    <table
                      id="base-style"
                      className="table table-striped table-bordered"
                      style={{ tableLayout: 'fixed' }}
                    >
                      <thead>
                        <tr>
                          <th style={{ width: '8%' }}>
                            <FormattedMessage id="ID" />
                          </th>
                          <th style={{ width: '8%' }}>
                            <FormattedMessage id="TYPE" />
                          </th>
                          <th style={{ width: '40%' }}>
                            <FormattedMessage id="DATA" />
                          </th>
                          <th style={{ width: '34%' }}>
                            <FormattedMessage id="TRANSACTION ID" />
                          </th>
                          <th style={{ width: '10%' }}>
                            <FormattedMessage id="DATE" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.explorerStore.actions.map((action, index) => (
                          <tr key={index}>
                            <td style={{ whiteSpace: 'normal' }}>{action.global_action_seq}</td>
                            <td style={{ whiteSpace: 'normal' }}>{action.action_trace.act.name}</td>
                            <td style={{ whiteSpace: 'normal' }}>
                              {JSON.stringify(action.action_trace.act.data)}
                            </td>
                            <td style={{ whiteSpace: 'normal' }}>
                              <Link to={'/blockexplorers/' + action.action_trace.trx_id}>
                                <span className="text-c-blue">{action.action_trace.trx_id}</span>
                              </Link>
                            </td>
                            <td style={{ whiteSpace: 'normal' }}>
                              {format(new Date(action.block_time), 'YYYY-MM-DD HH:mm:ss.SSS')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default AccountView
