import React, { Component } from 'react'
import Decimal from 'decimal.js'

class DelegateView extends Component {
  isValid = (nextCpu, nextNet) => {
    const { accountStore } = this.props
    let targetCpu = nextCpu ? nextCpu : 0
    let targetNet = nextNet ? nextNet : 0

    if (!accountStore || !accountStore.accountInfo || !accountStore.liquid) return false
    const core_liquid_balance = accountStore.accountInfo.core_liquid_balance
    const { cpu_weight, net_weight } = accountStore.accountInfo.self_delegated_bandwidth

    const currentLiquidAmount = new Decimal(core_liquid_balance.split(' ')[0])
    const currentCpuAmount = new Decimal(cpu_weight.split(' ')[0])
    const currentNetAmount = new Decimal(net_weight.split(' ')[0])

    const limit = currentLiquidAmount.plus(currentCpuAmount).plus(currentNetAmount)
    const newValue = new Decimal(targetCpu).plus(targetNet)

    return newValue.lessThan(limit) ? true : false
  }

  getStakeChanges = (nextNetAmount, nextCpuAmount) => {
    const { accountStore } = this.props

    if (!accountStore || !accountStore.accountInfo) return null
    const { cpu_weight, net_weight } = accountStore.accountInfo.self_delegated_bandwidth

    const currentCpuAmount = new Decimal(cpu_weight.split(' ')[0])
    const currentNetAmount = new Decimal(net_weight.split(' ')[0])

    const increaseInStake = {
      netAmount: Math.max(0, nextNetAmount - currentNetAmount),
      cpuAmount: Math.max(0, nextCpuAmount - currentCpuAmount)
    }

    const decreaseInStake = {
      netAmount: Math.max(0, currentNetAmount - nextNetAmount),
      cpuAmount: Math.max(0, currentCpuAmount - nextCpuAmount)
    }

    return {
      increaseInStake,
      decreaseInStake
    }
  }

  render() {
    return <div />
  }
}

export default DelegateView
