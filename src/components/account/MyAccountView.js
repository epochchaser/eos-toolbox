import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'
import BalanceView from './BalanceView'

@inject('accountStore')
@observer
class MyAccountView extends Component {
  constructor(props) {
    super(props)
    let { accountStore } = this.props
    this.accountStore = accountStore
  }

  render() {
    const cpu = this.accountStore.accountInfo.total_resources
      ? Number(this.accountStore.accountInfo.total_resources.cpu_weight.replace('EOS', ''))
      : 0.0
    const net = this.accountStore.accountInfo.total_resources
      ? Number(this.accountStore.accountInfo.total_resources.net_weight.replace('EOS', ''))
      : 0.0

    const stakeEos = cpu + net
    const unstakeEos = this.accountStore.accountInfo.core_liquid_balance
      ? Number(this.accountStore.accountInfo.core_liquid_balance.replace('EOS', ''))
      : 0.0

    const refundCpu = this.accountStore.accountInfo.refund_request
      ? Number(this.accountStore.accountInfo.refund_request.cpu_amount.replace('EOS', ''))
      : 0.0
    const refundNet = this.accountStore.accountInfo.refund_request
      ? Number(this.accountStore.accountInfo.refund_request.net_amount.replace('EOS', ''))
      : 0.0

    const refundEos = refundCpu + refundNet
    const totalEos = stakeEos + unstakeEos + refundEos

    const eosBalance = {
      title: 'Balance',
      subTitle: 'Total',
      balance: this.accountStore.eosBalance ? this.accountStore.eosBalance : 0,
      unit: ' EOS',
      total: totalEos,
      totalUnit: ' EOS',
      color: 'bg-c-pink',
      icon: 'ti-wallet'
    }

    const stakedEosBalance = {
      title: 'Staked',
      subTitle: 'Total',
      balance: stakeEos,
      unit: ' EOS',
      total: totalEos,
      totalUnit: ' EOS',
      color: 'bg-c-blue',
      icon: 'ti-reload'
    }

    const refundEosBalance = {
      title: 'Refund',
      subTitle: 'Total',
      balance: refundEos,
      unit: ' EOS',
      total: totalEos,
      totalUnit: ' EOS',
      color: 'bg-c-green',
      icon: 'ti-money'
    }

    const ramOwned = {
      title: 'Ram owned',
      subTitle: 'Ram usage',
      balance: this.accountStore.accountInfo ? this.accountStore.accountInfo.ram_quota : 0,
      unit: ' bytes',
      total: this.accountStore.accountInfo ? this.accountStore.accountInfo.ram_usage : 0,
      totalUnit: ' bytes',
      color: 'bg-c-yellow',
      icon: 'ti-save'
    }

    const cpuStake = {
      title: 'Cpu Staked',
      subTitle: 'Cpu max',
      balance: this.accountStore.accountInfo
        ? this.accountStore.accountInfo.total_resources.cpu_weight
        : 0,
      unit: ' EOS',
      total: this.accountStore.accountInfo ? this.accountStore.accountInfo.cpu_limit.max : 0,
      totalUnit: ' µs',
      color: 'bg-c-green',
      icon: 'ti-pulse'
    }

    const netStake = {
      title: 'Net Staked',
      subTitle: 'Net max',
      balance: this.accountStore.accountInfo
        ? this.accountStore.accountInfo.total_resources.net_weight
        : 0,
      unit: ' EOS',
      total: this.accountStore.accountInfo ? this.accountStore.accountInfo.net_limit.max : 0,
      totalUnit: ' bytes',
      color: 'bg-c-blue',
      icon: 'ti-signal'
    }

    return (
      <Fragment>
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-body">
              <div className="row">
                <BalanceView balance={eosBalance} />
                <BalanceView balance={stakedEosBalance} />
                <BalanceView balance={refundEosBalance} />
              </div>
              <div className="row">
                <BalanceView balance={ramOwned} />
                <BalanceView balance={cpuStake} />
                <BalanceView balance={netStake} />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default MyAccountView
