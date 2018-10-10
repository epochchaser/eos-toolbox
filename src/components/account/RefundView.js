import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'
import EosAgent from '../../EosAgent'
import Swal from 'sweetalert2'

@inject('accountStore')
@observer
class RefundView extends Component {
  claimRefund = async () => {
    const { accountStore } = this.props
    if (!accountStore || !accountStore.account || !accountStore.accountInfo) return

    Swal({
      title: 'Claim Refund',
      text:
        'Claim refund...\nScatter should appear shortly to confirm this action.\nYOUR TRANSACTION WILL BE SENT TO THE NETWORK AFTERWARDS',
      input: 'text',
      inputValue: accountStore.account.name,
      inputAttributes: {
        autocapitalize: 'off'
      },
      inputPlaceholder: 'owner',
      showCancelButton: true,
      confirmButtonText: 'Comfirm',
      showLoaderOnConfirm: true,
      preConfirm: owner => {
        return EosAgent.refund(owner)
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

    return (
      accountStore &&
      accountStore.account &&
      accountStore.accountInfo && (
        <div className="col-sm-12">
          <div className="card">
            <div className="card-block">
              <div className="row">
                <div className="col-lg-6 offset-lg-3 m-t-10">
                  <h5 className="txt-highlight text-center">
                    <FormattedMessage id="Claim Refund" />
                  </h5>
                  <p className="text-muted text-center m-t-20">
                    <FormattedMessage id="By executing this action you are agreeing to the EOS constitution and this actions associated ricardian contract." />
                  </p>
                </div>
                <div className="col-lg-6 offset-lg-3">
                  <div className="card-block text-center">
                    <i className="fa fa-sign-in text-c-green d-block f-40" />
                    <h4 className="m-t-20">
                      {`${Number(accountStore.totalRefund).toFixed(4)} EOS`}
                    </h4>
                    <p className="m-b-20">
                      <FormattedMessage id="Unstaked amount" />
                    </p>
                    <button className="btn btn-success btn-md btn-round" onClick={this.claimRefund}>
                      <FormattedMessage id="Claim" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    )
  }
}

export default RefundView
