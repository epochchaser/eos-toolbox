import React, { Component } from 'react'
import { inject, observer } from '../../node_modules/mobx-react'

@inject('accountStore', 'eosioStore')
@observer
class MyVotecastView extends Component {
  deleteProducer = name => event => {
    const { accountStore } = this.props
    const { myBlockProducers } = accountStore

    let filterBaseBPList = myBlockProducers.filter(bp => bp !== name)
    accountStore.updateMyBlockProducers(filterBaseBPList)
  }

  voteProducer = () => {
    const { eosioStore, accountStore } = this.props
    const { myBlockProducers, account } = accountStore

    if (account) {
      eosioStore.voteProducer(account.name, myBlockProducers)
    }
  }

  render() {
    const { accountStore } = this.props
    const { myBlockProducers } = accountStore

    return (
      <div className="card">
        <div className="card-header">
          <h5>Your vote cast</h5>
          <span>
            your <code>BLOCK PRODUCER </code> list
          </span>
        </div>

        <div className="card-block">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <button className="btn btn-primary btn-block">Set voter proxy</button>
                <button className="btn btn-danger btn-block" onClick={this.voteProducer}>
                  Submit votes for selected producers
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
                  <th>Producer</th>
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
