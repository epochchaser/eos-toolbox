import React, { Component } from 'react'
import Decimal from 'decimal.js'
import { FormattedMessage } from 'react-intl'
import { inject, observer } from '../../../node_modules/mobx-react'
import EosAgent from '../../EosAgent'
import Swal from 'sweetalert2'

@inject('accountStore')
@observer
class DelegateView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stakeCpu: 0,
      stakeNet: 0,
      isValid: false
    }
  }

  componentDidMount = () => {
    this.loadInitialSeed()
  }

  loadInitialSeed = () => {
    const { accountStore } = this.props

    const isValid = this.isValid(accountStore.cpu_staked, accountStore.net_staked)
    this.setState({
      stakeCpu: accountStore.cpu_staked,
      stakeNet: accountStore.net_staked,
      isValid
    })
  }

  onValueChange = name => event => {
    let stakeCpu
    let stakeNet
    let isValid = false

    if (name === 'cpu') {
      stakeCpu = event.target.value
      stakeNet = this.state.stakeNet
    } else if (name === 'net') {
      stakeCpu = this.state.stakeCpu
      stakeNet = event.target.value
    }

    isValid = this.isValid(stakeCpu, stakeNet)
    this.setState({
      stakeCpu,
      stakeNet,
      isValid
    })
  }

  isValid = (nextCpu, nextNet) => {
    const { accountStore } = this.props
    let targetCpu = nextCpu ? nextCpu : 0
    let targetNet = nextNet ? nextNet : 0

    if (!accountStore || !accountStore.accountInfo || !accountStore.liquid) return false
    const core_liquid_balance = accountStore.accountInfo.core_liquid_balance
    const unstaked = new Decimal(accountStore.totalBalance - accountStore.staked)

    const currentLiquidAmount = new Decimal(core_liquid_balance.split(' ')[0])
    const limit = unstaked.plus(currentLiquidAmount)
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
  delegatebwParams = (delegator, receiver, netAmount, cpuAmount) => {
    const stakeNetAmount = netAmount || 0
    const stakeCpuAmount = cpuAmount || 0

    return {
      from: delegator,
      receiver,
      stake_net_quantity: `${stakeNetAmount.toFixed(4)} EOS`,
      stake_cpu_quantity: `${stakeCpuAmount.toFixed(4)} EOS`,
      transfer: 0
    }
  }

  onConfirm = () => {
    const { accountStore } = this.props
    const { name } = accountStore.account

    Swal({
      title: 'Update Staked Balances',
      text: '',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Comfirm',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return EosAgent.delegate(
          this.delegatebwParams(
            name,
            name,
            new Decimal(this.state.stakeNet),
            new Decimal(this.state.stakeCpu)
          )
        )
          .then(async response => {
            if (!response) {
              throw new Error(response.statusText)
            }

            await accountStore.loadAccountInfo()
            this.loadInitialSeed()
            return response
          })
          .catch(error => {
            Swal.showValidationError(`Request failed: ${error}`)
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.value) {
        Swal({
          title: 'Success'
          // imageUrl: result.value.avatar_url
        })
      }
    })
  }

  render() {
    const { stakeCpu, stakeNet } = this.state
    const { accountStore } = this.props

    const core_liquid_balance = accountStore.accountInfo.core_liquid_balance
    const currentLiquidAmount = new Decimal(core_liquid_balance.split(' ')[0])
    const unstaked = new Decimal(accountStore.totalBalance - accountStore.staked)
    const limit = unstaked.plus(currentLiquidAmount).toNumber()

    const afterStakeCpu = Number(stakeCpu)
    const afterStakeNet = Number(stakeNet)

    const afterUnstakeCpuChartStyle = {
      width: `${(afterStakeCpu / limit) * 100}%`
    }

    const afterUnstakeNetChartStyle = {
      width: `${(afterStakeNet / limit) * 100}%`
    }

    return (
      <div>
        <div className="card">
          <div className="card-block">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <h5 className="txt-highlight text-center">
                  <FormattedMessage id="Delegate" />
                </h5>
                <p className="text-muted text-center m-t-20">
                  <FormattedMessage id="Simulate values you want to delegate and click confirm." />
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
                    value={this.state.stakeCpu}
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
                    value={this.state.stakeNet}
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
                      <h2 className="f-w-400">{afterStakeCpu} EOS</h2>
                      <p className="text-muted f-w-400">Staked after update CPU</p>
                      <div className="progress">
                        <div
                          className="progress-bar bg-c-yellow"
                          role="progressbar"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={afterUnstakeCpuChartStyle}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 p-b-30">
                      <h2 className="f-w-400">{afterStakeNet} EOS</h2>
                      <p className="text-muted f-w-400">Staked after update NET</p>
                      <div className="progress">
                        <div
                          className="progress-bar bg-c-green "
                          role="progressbar"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={afterUnstakeNetChartStyle}
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
                    : 'btn btn-primary btn-block diabled'
                }
                onClick={this.onConfirm}
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

export default DelegateView
