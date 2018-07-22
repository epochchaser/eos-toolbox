import React, { Component, Fragment } from 'react'
import { inject, observer } from '../../../node_modules/mobx-react'
import { FormattedMessage } from 'react-intl'
import Swal from 'sweetalert2'

@inject('accountStore')
@observer
class MyVotecastView extends Component {
  constructor(props) {
    super(props)
    const { accountStore } = this.props
    this.accountStore = accountStore
  }

  deleteProducer = name => event => {
    if (!this.accountStore) return
    this.accountStore.updateMyBlockProducers(name, false)
  }

  voteProducer = async () => {
    Swal({
      title: 'Vote',
      text: 'By completing this transaction, I agree to the EOS constitution',
      showCancelButton: true,
      confirmButtonText: 'Comfirm',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return this.accountStore
          .voteProducer()
          .then(response => {
            return response
          })
          .catch(err => {
            Swal.showValidationError(err)
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.value) {
        Swal('Good job!', 'Your transaction(s) have been submitted to the blockchain.', 'success')
      }
    })
  }

  voteAsProxy = async () => {
    Swal({
      title: 'Set Voter Proxy',
      text: 'Enter the account name you wish to proxy your producer voting weight to:',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      inputPlaceholder: 'proxy',
      showCancelButton: true,
      confirmButtonText: 'Comfirm',
      showLoaderOnConfirm: true,
      preConfirm: proxy => {
        return this.accountStore
          .voteProducer(proxy)
          .then(async response => {
            await this.accountStore.loadAccountInfo()
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
        if (result.value) {
          Swal('Good job!', 'Your transaction(s) have been submitted to the blockchain.', 'success')
        }
      }
    })
  }

  changeVoterProxy = async () => {
    Swal({
      title: 'Change Voter Proxy',
      text:
        'You are about to remove your proxy voter. Afterwards you will be able to cast your own votes again or set a different proxy account.',
      showCancelButton: true,
      confirmButtonText: 'Comfirm',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return this.accountStore
          .changeVoterProxy()
          .then(async response => {
            await this.accountStore.loadAccountInfo()
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
        if (result.value) {
          Swal('Good job!', 'Your transaction(s) have been submitted to the blockchain.', 'success')
        }
      }
    })
  }

  render() {
    const { accountStore } = this.props
    const { myBlockProducers, proxy } = accountStore

    return (
      <Fragment>
        <div className="card summery-card">
          <div className="card-header">
            <div className="card-header-left ">
              <h5>
                <FormattedMessage id="Voting Action" />
              </h5>
            </div>
          </div>

          <div className="card-block">
            <div className="row">
              {proxy ? (
                <div className="col-sm-12 p-b-40">
                  <div className="card-block text-center">
                    <i className="fa fa-sign-in text-c-pink d-block f-40" />
                    <p className="m-b-20">Your voter proxy : {proxy}</p>
                    <button
                      className="btn btn-danger btn-md btn-round"
                      onClick={this.changeVoterProxy}
                    >
                      <FormattedMessage id="Change voter proxy" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="col-sm-12 p-b-40">
                  <div className="card-block text-center">
                    <i className="fa fa-sign-in text-c-green d-block f-40" />
                    <p className="m-b-20">You have no voter proxy</p>
                    <button className="btn btn-success btn-md btn-round" onClick={this.voteAsProxy}>
                      <FormattedMessage id="Set voter proxy" />
                    </button>
                  </div>

                  <div className="card-block text-center">
                    <button
                      className="btn btn-success btn-md btn-round"
                      onClick={this.voteProducer}
                    >
                      <FormattedMessage id="Submit Votes For Selected Producers" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h5>
              <FormattedMessage id="Your vote cast" />
            </h5>
            <span>
              your <code>BLOCK PRODUCER </code> list
            </span>
          </div>

          <div className="card-block table-border-style">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>-</th>
                    <th>
                      <FormattedMessage id="Producer" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {myBlockProducers &&
                    myBlockProducers.map((v, index) => (
                      <tr key={v}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <div className="icon-btn">
                            <button
                              className="btn btn-secondary btn-outline-secondary btn-icon"
                              onClick={this.deleteProducer(v)}
                            >
                              <i className="icofont icofont-not-allowed" />
                            </button>
                          </div>
                        </td>
                        <td>{v}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {!myBlockProducers && (
                <div className="preloader3 loader-block">
                  <div className="circ1" />
                  <div className="circ2" />
                  <div className="circ3" />
                  <div className="circ4" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default MyVotecastView
