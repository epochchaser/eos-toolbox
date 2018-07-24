import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { inject, observer } from '../../../node_modules/mobx-react'
import Swal from 'sweetalert2'

@inject('accountStore')
@observer
class StakingView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cpu_user: 0.0,
      net_user: 0.0,
      isValidInput: true
    }
  }

  componentDidMount = () => {
    const { accountStore } = this.props
    this.updateValidationResult(true, accountStore.cpu_staked, accountStore.net_staked)
  }

  onValueChange = name => event => {
    const { accountStore } = this.props
    const { cpu_user, net_user } = this.state
    let targetCpu
    let targetNet

    if (name === 'cpu') {
      targetCpu = Number(event.target.value)
      targetNet = net_user
    } else if (name === 'net') {
      targetCpu = cpu_user
      targetNet = Number(event.target.value)
    }

    const isValid = accountStore.validateStakingInput(targetCpu, targetNet)
    this.updateValidationResult(isValid, targetCpu, targetNet)
  }

  updateValidationResult = (isValidInput, cpu_user, net_user) => {
    this.setState({
      isValidInput,
      cpu_user,
      net_user
    })
  }

  onConfirm = () => {
    const { accountStore } = this.props
    const { net_user, cpu_user } = this.state

    Swal({
      title: 'Update Staked Balances',
      text:
        'You are about to update staked balances, please note that all coins that were staked will have to be claimed in 72 hours.',
      showCancelButton: true,
      confirmButtonText: 'Comfirm',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return accountStore
          .setStake(net_user, cpu_user)
          .then(async response => {
            console.log('들어왓냐')
            await accountStore.loadAccountInfo()
            console.log('여긴')
            this.updateValidationResult(true, accountStore.cpu_staked, accountStore.net_staked)
            console.log('저긴')
            return response
          })
          .catch(err => {
            if (err) {
              if (err.message) {
                Swal.showValidationError(err.message)
                return
              }

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
    const { accountStore } = this.props

    const { cpu_staked, net_staked, liquid } = accountStore
    const { cpu_user, net_user, isValidInput } = this.state

    const cpu_limit = cpu_staked + liquid
    const net_limit = net_staked + liquid

    const afterUnstakeCpuChartStyle = {
      width: `${(cpu_user / cpu_limit) * 100}%`
    }

    const afterUnstakeNetChartStyle = {
      width: `${(net_user / net_limit) * 100}%`
    }

    return (
      <div>
        <div className="card">
          <div className="card-block">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <h5 className="txt-highlight text-center">
                  <FormattedMessage id="Update staked balances" />
                </h5>
                <p className="text-muted text-center m-t-20">
                  <FormattedMessage id="Update amount to stake or unstake" />
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6 p-b-30">
                <h6>
                  <FormattedMessage id="Set EOS staked in CPU" />
                </h6>
                <div className="input-group input-group-primary">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="CPU goes here..."
                    value={cpu_user}
                    onChange={this.onValueChange('cpu')}
                  />
                </div>
              </div>
              <div className="col-sm-6 p-b-30">
                <h6>
                  <FormattedMessage id="Set EOS staked in NET" />
                </h6>
                <div className="input-group input-group-primary">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="NET goes here..."
                    value={net_user}
                    onChange={this.onValueChange('net')}
                  />
                </div>
              </div>
            </div>

            {!isValidInput && (
              <div className="b-t-default b-b-default p-t-10 color-danger">
                <h5 className="text-center text-white">
                  <FormattedMessage id="Error" />
                </h5>
                <p className="text-white text-center m-t-20">
                  <FormattedMessage id="Insufficient available EOS balance to complete transaction. Or Unable to set staked amount to 0. Doing so would prevent you from performing any transactions on the network." />
                </p>
              </div>
            )}

            <div className="row p-t-20">
              <div className="col-md-12 col-xl-12">
                <h5>
                  <FormattedMessage id="Simulation Summary" />
                </h5>
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-6 b-r-default p-b-30">
                      <h2 className="f-w-400">{cpu_user} EOS</h2>
                      <p className="text-muted f-w-400">
                        <FormattedMessage id="Total Staked after update for CPU" />
                      </p>
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
                      <h2 className="f-w-400">{net_user} EOS</h2>
                      <p className="text-muted f-w-400">
                        <FormattedMessage id="Total Staked after update for NET" />
                      </p>
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
                disabled={!isValidInput}
                className={
                  isValidInput ? 'btn btn-primary btn-block' : 'btn btn-primary btn-block disabled'
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

export default StakingView
