import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'
import EosAgent from '../../EosAgent'
import Swal from 'sweetalert2'

@inject('accountStore')
@observer
class RegVoteProxyView extends Component {
  regProxy = async () => {
    const { accountStore } = this.props
    if (!accountStore || !accountStore.account) return

    try {
      Swal({
        title: 'Register as a Proxy Voter',
        text:
          'You are about to register this account as a proxy voter. After registration other accounts will be able to set this account as a proxy.',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Comfirm',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return EosAgent.regproxy(accountStore.account.name)
            .then(async response => {
              if (!response) {
                throw new Error(response.statusText)
              }

              await accountStore.loadAccountInfo()
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
          })
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  unRegProxy = async () => {
    const { accountStore } = this.props
    if (!accountStore || !accountStore.account) return

    try {
      Swal({
        title: 'Unregister as a Proxy Voter',
        text:
          'You are about to unregister this account as a proxy voter. After unregistration other accounts will not be able to set this account as a proxy.',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Comfirm',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return EosAgent.unregproxy(accountStore.account.name)
            .then(async response => {
              if (!response) {
                throw new Error(response.statusText)
              }

              await accountStore.loadAccountInfo()
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
          })
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { accountStore } = this.props

    return (
      accountStore &&
      accountStore.account && (
        <div className="col-sm-12">
          <div className="card">
            <div className="card-block">
              <div className="row">
                <div className="col-lg-6 offset-lg-3 m-t-10">
                  <h5 className="txt-highlight text-center">
                    <FormattedMessage id="Proxy Voter Registration" />
                  </h5>
                  <p className="text-muted text-center m-t-20">
                    {accountStore.is_proxy ? (
                      <FormattedMessage id="This account is now registered and available to be used as a proxy account." />
                    ) : (
                      <FormattedMessage id="This account isn't registered and unavailable to be used as a proxy account." />
                    )}
                  </p>
                </div>
                {accountStore.is_proxy ? (
                  <div className="col-lg-6 offset-lg-3">
                    <div className="card-block text-center">
                      <i className="fa fa-sign-out text-c-pink d-block f-40" />
                      <h4 className="m-t-20">
                        <span className="text-c-blgreenue">{accountStore.account.name} </span>
                      </h4>
                      <p className="m-b-20">
                        <FormattedMessage id="you are currently a voter proxy!" />
                      </p>
                      <button className="btn btn-danger btn-md btn-round" onClick={this.unRegProxy}>
                        <FormattedMessage id="Unregister as proxy voter" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="col-lg-6 offset-lg-3">
                    <div className="card-block text-center">
                      <i className="fa fa-sign-in text-c-green d-block f-40" />
                      <h4 className="m-t-20">{accountStore.account.name}</h4>
                      <p className="m-b-20">
                        <FormattedMessage id="you are currently not a voter proxy!" />
                      </p>
                      <button className="btn btn-success btn-md btn-round" onClick={this.regProxy}>
                        <FormattedMessage id="Register as proxy voter" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    )
  }
}

export default RegVoteProxyView
