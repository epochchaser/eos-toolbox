import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import '../styles/pages/Voting.scss'

@inject('eosioStore', 'accountStore')
@observer
class Voting extends Component {
  componentDidMount = async () => {
    const { eosioStore, accountStore } = this.props

    //await accountStore.login()

    //console.log(accountStore.accountInfo)
    eosioStore.getBlockProducers()
  }

  render() {
    const { eosioStore, accountStore } = this.props
    const { blockProducers } = eosioStore
    const { accountInfo } = accountStore

    return (
      <Fragment>
        <div className="page-wrapper">
          <div className="page-body">
            <div className="row">
              <div className="col-md-12 col-xl-4">
                <div className="card">
                  <div className="card-header">
                    <h5>Your vote cast</h5>
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
                            <th>Producer</th>
                          </tr>
                        </thead>
                        <tbody>
                          {accountInfo &&
                            accountInfo.voter_info.producers.map((v, index) => (
                              <tr key={v}>
                                <th scope="row">{index + 1}</th>
                                <td>{v}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      {(!accountInfo || !accountInfo.voter_info.producers) && (
                        <div class="preloader3 loader-block">
                          <div class="circ1" />
                          <div class="circ2" />
                          <div class="circ3" />
                          <div class="circ4" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-xl-8">
                <div className="card">
                  <div className="card-header">
                    <h5>Producers</h5>
                    <span>
                      vote to <code>BLOCK PRODUCERS</code> that you want
                    </span>
                    <div className="card-header-right">
                      <ul className="list-unstyled card-option">
                        <li>
                          <i className="fa fa-chevron-left" />
                        </li>
                        <li>
                          <i className="fa fa-window-maximize full-card" />
                        </li>
                        <li>
                          <i className="fa fa-minus minimize-card" />
                        </li>
                        <li>
                          <i className="fa fa-refresh reload-card" />
                        </li>
                        <li>
                          <i className="fa fa-times close-card" />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-block table-border-style">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Producer</th>
                            <th>Total votes</th>
                            <th>%</th>
                            <th>Active</th>
                          </tr>
                        </thead>
                        <tbody>
                          {blockProducers &&
                            blockProducers.map((p, index) => (
                              <tr key={p.key}>
                                <th scope="row">{index + 1}</th>
                                <td>{p.owner}</td>
                                <td>{p.votes}</td>
                                <td>
                                  <div className="progress progress-sm">
                                    <div
                                      className="progress-bar progress-bar-warning"
                                      role="progressbar"
                                      style={{ width: `${p.percent * 100}%` }}
                                      aria-valuenow={p.percent * 100}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    />
                                  </div>
                                </td>
                                <td>
                                  {p.isBackup ? (
                                    <label className="badge badge-primary">o</label>
                                  ) : (
                                    <label className="badge badge-warning">x</label>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>

                      {!blockProducers && (
                        <div class="preloader3 loader-block">
                          <div class="circ1" />
                          <div class="circ2" />
                          <div class="circ3" />
                          <div class="circ4" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Voting
