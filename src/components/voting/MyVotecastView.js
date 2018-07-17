import React, { Component } from 'react'
import { inject, observer } from '../../../node_modules/mobx-react'
import { FormattedMessage } from 'react-intl'
import Swal from 'sweetalert2'

@inject('accountStore', 'eosioStore')
@observer
class MyVotecastView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false
    }
  }

  deleteProducer = name => event => {
    const { accountStore } = this.props
    const { myBlockProducers } = accountStore

    let filterBaseBPList = myBlockProducers.filter(bp => bp !== name)
    accountStore.updateMyBlockProducers(filterBaseBPList)
  }

  voteProducer = async () => {
    const { eosioStore, accountStore } = this.props
    const { myBlockProducers, account } = accountStore

    if (account) {
      const result = await eosioStore.voteProducer(account.name, myBlockProducers)
      if (result) {
        Swal('Good job!', 'Your transaction(s) have been submitted to the blockchain.', 'success')
      }
    }
  }

  voteAsProxy = async () => {
    const { eosioStore, accountStore } = this.props
    const { account } = accountStore

    if (account) {
      Swal({
        title: 'Enter the account name you wish to proxy your producer voting weight to:',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Comfirm',
        showLoaderOnConfirm: true,
        preConfirm: proxy => {
          return eosioStore
            .voteProducer(account.name, [], proxy)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
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
  }

  render() {
    const { accountStore } = this.props
    const { myBlockProducers } = accountStore

    return (
      <div className="card">
        <div className="card-header">
          <h5>
            <FormattedMessage id="Your vote cast" />
          </h5>
          <span>
            your <code>BLOCK PRODUCER </code> list
          </span>
        </div>

        <div className="card-block">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <button className="btn btn-primary btn-block" onClick={this.voteAsProxy}>
                  <FormattedMessage id="Set voter proxy" />
                </button>

                <button className="btn btn-danger btn-block" onClick={this.voteProducer}>
                  <FormattedMessage id="Submit Votes For Selected Producers" />
                </button>
              </div>
            </div>
          </div>
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
    )
  }
}

export default MyVotecastView
