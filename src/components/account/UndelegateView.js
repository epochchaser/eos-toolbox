import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'
import Swal from 'sweetalert2'

@inject('accountStore')
@observer
class UndelegateView extends Component {
  onValueChange = name => event => {
    const { accountStore } = this.props
    const userInput = Number(event.target.value)

    if (name === 'cpu') {
      accountStore.validateUnstakingInput(userInput, accountStore.net_user)
    } else if (name === 'net') {
      accountStore.validateUnstakingInput(accountStore.cpu_user, userInput)
    }
  }

  onConfirm = () => {
    const { accountStore } = this.props

    Swal({
      title: 'Update Staked Balances',
      text:
        'You are about to unstake some coins, please note that all coins that were unstaked will have to be claimed in 72 hours.',
      showCancelButton: true,
      confirmButtonText: 'Comfirm',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return accountStore
          .undelegate()
          .then(async response => {
            await accountStore.loadAccountInfo()
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
    const { cpu_staked, net_staked, cpu_user, net_user, isValidInput } = accountStore

    const afterUnstakeCpu = cpu_staked - cpu_user
    const afterUnstakeNet = net_staked - net_user

    const afterUnstakeCpuChartStyle = {
      width: `${(afterUnstakeCpu / cpu_staked) * 100}%`
    }

    const afterUnstakeNetChartStyle = {
      width: `${(afterUnstakeNet / net_staked) * 100}%`
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
                    value={cpu_user}
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
                  <FormattedMessage id="Insufficient available EOS balance to complete transaction." />
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
                      <h2 className="f-w-400">{`${afterUnstakeCpu} EOS`}</h2>
                      <p className="text-muted f-w-400">
                        <FormattedMessage id="Staked after update for CPU" />
                      </p>
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
                      <p className="text-muted f-w-400">
                        <FormattedMessage id="Staked after update for NET" />
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

export default UndelegateView
