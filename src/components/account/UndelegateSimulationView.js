import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'
import Decimal from 'decimal.js'
import debounce from 'lodash.debounce'

@inject('accountStore')
@observer
class UndelegateSimulationView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      toCpu: 0,
      toNet: 0,
      isValid: false
    }
  }

  componentDidMount = () => {
    const { accountStore } = this.props

    const isValid = this.isValid(accountStore.cpu_staked, accountStore.net_staked)
    this.setState({
      toCpu: accountStore.cpu_staked,
      toNet: accountStore.net_staked,
      isValid
    })
  }

  onValueChange = name => event => {
    let toCpu
    let toNet
    let isValid = false

    if (name === 'cpu') {
      toCpu = event.target.value
      toNet = this.state.toNet
    } else if (name === 'net') {
      toCpu = this.state.toCpu
      toNet = event.target.value
    }

    isValid = this.isValid(toCpu, toNet)
    this.setState({
      toCpu,
      toNet,
      isValid
    })
  }

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

  undelegatebwParams = (delegator, receiver, netAmount, cpuAmount) => {
    const unstakeNetAmount = netAmount || 0
    const unstakeCpuAmount = cpuAmount || 0

    return {
      from: delegator,
      receiver,
      unstake_net_quantity: `${unstakeNetAmount.toFixed(4)} EOS`,
      unstake_cpu_quantity: `${unstakeCpuAmount.toFixed(4)} EOS`,
      transfer: 0
    }
  }

  onConfirm = () => {}

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-block">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <h5 className="txt-highlight text-center">
                  <FormattedMessage id="Undelegate" />
                </h5>
                <p className="text-muted text-center m-t-20">
                  <FormattedMessage id="Simulate values you want to undelegate and click confirm." />
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6 p-b-30">
                <div className="input-group input-group-primary">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="CPU goes here..."
                    value={this.state.toCpu}
                    onChange={this.onValueChange('cpu')}
                  />
                </div>
              </div>
              <div className="col-sm-6 p-b-30">
                <div className="input-group input-group-primary">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="NET goes here..."
                    value={this.state.toNet}
                    onChange={this.onValueChange('net')}
                  />
                </div>
              </div>
            </div>

            {!this.state.isValid && (
              <div className="b-t-default b-b-default p-t-10 color-danger">
                <h5 className="text-center text-white">
                  <FormattedMessage id="Error" />
                </h5>
                <p className="text-white text-center m-t-20">
                  <FormattedMessage id="Insufficient available EOS balance to complete transaction." />
                </p>
              </div>
            )}

            <div className="row p-t-20">
              <div className="col-md-12 col-xl-12">
                <h5>Simulation Summary</h5>
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-6 b-r-default p-b-30">
                      <h2 className="f-w-400">{this.state.toCpu} EOS</h2>
                      <p className="text-muted f-w-400">to CPU</p>
                      <div className="progress">
                        <div
                          className="progress-bar bg-c-yellow"
                          role="progressbar"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: '50%' }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 p-b-30">
                      <h2 className="f-w-400">{this.state.toNet} EOS</h2>
                      <p className="text-muted f-w-400">to NET</p>
                      <div className="progress">
                        <div
                          className="progress-bar bg-c-green "
                          role="progressbar"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: '50%' }}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>

            <div className="form-group">
              <button
                className={
                  this.state.isValid
                    ? 'btn btn-primary btn-block'
                    : 'btn btn-primary btn-block disabled'
                }
              >
                <FormattedMessage id="Confirm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UndelegateSimulationView
