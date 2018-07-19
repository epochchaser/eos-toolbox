import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'
import Decimal from 'decimal.js'
import EosAgent from '../../EosAgent'
import Swal from 'sweetalert2'

@inject('accountStore')
@observer
class UndelegateView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      originStakeCpu: 0,
      originStakeNet: 0,
      unstakeCpu: 0,
      unstakeNet: 0,
      isValid: false
    }
  }

  componentDidMount = () => {
    this.loadInitialSeed()
  }

  loadInitialSeed = () => {
    const { accountStore } = this.props

    this.setState({
      originStakeCpu: accountStore.cpu_staked,
      originStakeNet: accountStore.net_staked,
      unstakeCpu: 0,
      unstakeNet: 0,
      isValid: true
    })
  }

  onValueChange = name => event => {
    let unstakeCpu
    let unstakeNet
    let isValid = false

    if (name === 'cpu') {
      unstakeCpu = event.target.value
      unstakeNet = this.state.unstakeNet
    } else if (name === 'net') {
      unstakeCpu = this.state.unstakeCpu
      unstakeNet = event.target.value
    }

    isValid = this.isValid(unstakeCpu, unstakeNet)
    this.setState({
      unstakeCpu,
      unstakeNet,
      isValid
    })
  }

  isValid = (nextCpu, nextNet) => {
    if (0 > nextCpu || 0 > nextNet) return false

    const { originStakeCpu, originStakeNet } = this.state
    let targetCpu = nextCpu ? nextCpu : 0
    let targetNet = nextNet ? nextNet : 0

    const validCpu = new Decimal(targetCpu).lessThanOrEqualTo(originStakeCpu)
    const validNet = new Decimal(targetNet).lessThanOrEqualTo(originStakeNet)

    return validCpu & validNet ? true : false
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

  onConfirm = () => {
    const { accountStore } = this.props
    const { name } = accountStore.account

    Swal({
      title: 'Update Staked Balances',
      text:
        'You are about to unstake some coins, please note that all coins that were unstaked will have to be claimed in 72 hours.',
      showCancelButton: true,
      confirmButtonText: 'Comfirm',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return EosAgent.undelegate(
          this.undelegatebwParams(
            name,
            name,
            new Decimal(this.state.unstakeNet),
            new Decimal(this.state.unstakeCpu)
          )
        )
          .then(async response => {
            await accountStore.loadAccountInfo()
            this.loadInitialSeed()
            return response
          })
          .catch(err => {
            if (err) {
              const parsedResult = JSON.parse(err)

              if (parsedResult.error.details && parsedResult.error.details.length > 0) {
                Swal.showValidationError(parsedResult.error.details[0].message)
              } else {
                Swal.showValidationError(parsedResult.message)
              }
            } else {
              Swal.showValidationError(err)
            }
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.value) {
        Swal('Good job!', 'Your transaction(s) have been submitted to the blockchain.', 'success')
      }
    })
  }

  render() {
    const { unstakeCpu, unstakeNet, originStakeCpu, originStakeNet } = this.state

    const targetUnstakeCpu = unstakeCpu ? unstakeCpu : 0
    const targetUnstakeNet = unstakeNet ? unstakeNet : 0
    const afterUnstakeCpu = originStakeCpu - targetUnstakeCpu
    const afterUnstakeNet = originStakeNet - targetUnstakeNet

    const afterUnstakeCpuChartStyle = {
      width: `${(afterUnstakeCpu / originStakeCpu) * 100}%`
    }

    const afterUnstakeNetChartStyle = {
      width: `${(afterUnstakeNet / originStakeNet) * 100}%`
    }

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
                  <FormattedMessage id="How many amount do you want to undelegate?" />
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
                    value={this.state.unstakeCpu}
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
                    value={this.state.unstakeNet}
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
                      <h2 className="f-w-400">{`${afterUnstakeCpu} EOS`}</h2>
                      <p className="text-muted f-w-400">Staked after update for CPU</p>
                      <div className="progress">
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={afterUnstakeCpuChartStyle}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 p-b-30">
                      <h2 className="f-w-400">{`${afterUnstakeNet} EOS`}</h2>
                      <p className="text-muted f-w-400">Staked after update for NET</p>
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
                disabled={!this.state.isValid}
                className={
                  this.state.isValid
                    ? 'btn btn-primary btn-block'
                    : 'btn btn-primary btn-block disabled'
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

export default UndelegateView
