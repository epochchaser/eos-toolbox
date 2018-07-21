import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'
import UsageResourceView from '../UsageResourceView'

@inject('accountStore')
@observer
class ResourceView extends Component {
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
      ? Number(this.accountStore.accountInfo.refund_request.replace('EOS', ''))
      : 0.0

    const refundEos = refundCpu + refundNet
    const totalEos = stakeEos + unstakeEos + refundEos
    const usageEosRate = (stakeEos / totalEos) * 100

    const cpuUsed =
      this.accountStore.accountInfo.cpu_limit.used > 0
        ? this.accountStore.accountInfo.cpu_limit.used
        : 0
    const cpuAvailable =
      this.accountStore.accountInfo.cpu_limit.available > 0
        ? this.accountStore.accountInfo.cpu_limit.available
        : 0
    const cpuMax =
      this.accountStore.accountInfo.cpu_limit.max > 0
        ? this.accountStore.accountInfo.cpu_limit.max
        : 0
    const usageCpuRate = cpuMax > 0 ? (cpuUsed / cpuMax) * 100 : 0

    const netUsed =
      this.accountStore.accountInfo.net_limit.used > 0
        ? this.accountStore.accountInfo.net_limit.used
        : 0
    const netAvailable =
      this.accountStore.accountInfo.net_limit.available > 0
        ? this.accountStore.accountInfo.net_limit.available
        : 0
    const netMax =
      this.accountStore.accountInfo.net_limit.max > 0
        ? this.accountStore.accountInfo.net_limit.max
        : 0
    const usageNetRate = netMax > 0 ? (netUsed / netMax) * 100 : 0

    const ramUsed =
      this.accountStore.accountInfo.ram_usage > 0 ? this.accountStore.accountInfo.ram_usage : 0
    const ramMax =
      this.accountStore.accountInfo.ram_quota > 0 ? this.accountStore.accountInfo.ram_quota : 0
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
    return (
      <Fragment>
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-body">
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <UsageResourceView resource={eosResource} />
                </div>
                <div className="col-lg-6 col-md-12">
                  <UsageResourceView resource={ramResource} />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <UsageResourceView resource={cpuResource} />
                </div>
                <div className="col-lg-6 col-md-12">
                  <UsageResourceView resource={netResource} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default ResourceView
