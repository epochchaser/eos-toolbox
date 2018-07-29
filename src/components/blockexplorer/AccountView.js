import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'
import { format } from 'date-fns'
import UsageResourceView from '../UsageResourceView'
import TokenView from '../account/TokenView'
import AccountDetailView from './AccountDetailView'
import ActionHistoryView from './ActionHistoryView'

@inject('explorerStore', 'accountStore')
@observer
class AccountView extends Component {
  constructor(props) {
    super(props)
    let { explorerStore } = this.props
    this.explorerStore = explorerStore
  }

  componentDidMount = async () => {
    await this.explorerStore.getActions(this.explorerStore.account.account_name)
    await this.explorerStore.getAccountTokens(this.explorerStore.account.account_name)
  }

  render() {
    const { accountStore } = this.props
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

    const cpuResource = {
      title: 'CPU Available',
      fixed: 4,
      available: cpuAvailable,
      unit: ' µs',
      used: cpuUsed,
      max: cpuMax,
      usageRate: usageCpuRate,
      color: 'green'
    }

    const eosResource = {
      title: 'EOS Available',
      fixed: 4,
      available: unstakeEos,
      unit: ' EOS',
      used: stakeEos,
      max: totalEos,
      usageRate: usageEosRate,
      color: 'pink'
    }

    const ramResource = {
      title: 'RAM Available',
      fixed: 4,
      available: ramAvailable / 1024,
      unit: ' KB',
      used: ramUsed / 1024,
      max: ramMax / 1024,
      usageRate: usageRamRate,
      color: 'blue'
    }

    const netResource = {
      title: 'NET Available',
      fixed: 4,
      available: netAvailable / 1024,
      unit: ' KB',
      used: netUsed / 1024,
      max: netMax / 1024,
      usageRate: usageNetRate,
      color: 'yellow'
    }

    const base_url = window.location.origin
    const img_path = `${base_url}/images/eos-symbol.png`

    return (
      <Fragment>
        <div className="col-lg-6 col-xl-4 col-md-12 m-b-30">
          <div className="card user-card">
            <div className="card-header">
              <h5>
                <FormattedMessage id="Profile" />
              </h5>
            </div>
            <div className="card-block p-0">
              <div className="usre-image">
                <img
                  src={img_path}
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
              <p className="text-muted p-t-15 p-b-15">
                Total :{' '}
                <NumberFormat
                  value={this.explorerStore.account.total.toFixed(4)}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={' EOS'}
                />
              </p>
              <div className="bg-c-blue counter-block p-15" style={{ height: '58px' }}>
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
          <UsageResourceView resource={eosResource} />
          <UsageResourceView resource={cpuResource} />
        </div>
        <div className="col-lg-6 col-md-12 col-xl-4">
          <UsageResourceView resource={ramResource} />
          <UsageResourceView resource={netResource} />
        </div>
        <div className="col-sm-12">
          <TokenView tokens={this.explorerStore.tokens} />
        </div>
        <div className="row m-l-10 m-b-20">
          <div className="col-sm-12">
            <h5>
              <FormattedMessage id="Actions" /> ({this.explorerStore.actions
                ? this.explorerStore.actions.length
                : 0})
            </h5>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="card tabs-card">
            <div className="card-block p-0">
              {accountStore.account && (
                <AccountDetailView account={this.explorerStore.account.account_name} />
              )}
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          <ActionHistoryView />
        </div>
      </Fragment>
    )
  }
}

export default AccountView
