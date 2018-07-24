import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import UsageResourceView from '../../UsageResourceView'
import { inject, observer } from '../../../../node_modules/mobx-react'

@inject('accountStore')
@observer
class RamStatusView extends Component {
  render() {
    const { accountStore } = this.props
    if (!accountStore || !accountStore.accountInfo) return

    const ramUsed = accountStore.accountInfo.ram_usage > 0 ? accountStore.accountInfo.ram_usage : 0
    const ramMax = accountStore.accountInfo.ram_quota > 0 ? accountStore.accountInfo.ram_quota : 0
    const ramAvailable = ramMax - ramUsed
    const usageRamRate = ramMax > 0 ? (ramUsed / ramMax) * 100 : 0

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

    return (
      <div className="col-sm-12">
        <UsageResourceView resource={ramResource} />
      </div>
    )
  }
}

export default RamStatusView
