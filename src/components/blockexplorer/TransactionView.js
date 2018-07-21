import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'
import { format } from 'date-fns'

@inject('explorerStore')
@observer
class TransactionView extends Component {
  constructor(props) {
    super(props)
    let { explorerStore } = this.props
    this.explorerStore = explorerStore
  }

  render() {
    return (
      <Fragment>
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header" style={{ paddingBottom: '0px' }}>
              <div className="card-header-left">
                <h6>
                  <FormattedMessage id="Transaction" />
                </h6>
              </div>
              <div className="card-header-right" style={{ display: 'none' }}>
                <ul className="list-unstyled card-option">
                  <li>
                    <i className="icofont icofont-simple-left " />
                  </li>
                  <li>
                    <i className="icofont icofont-maximize full-card" />
                  </li>
                  <li>
                    <i className="icofont icofont-minus minimize-card" />
                  </li>
                  <li>
                    <i className="icofont icofont-refresh reload-card" />
                  </li>
                  <li>
                    <i className="icofont icofont-error close-card" />
                  </li>
                </ul>
              </div>
            </div>
            <div className="card-block p-0">
              <div
                className="card-block-big revenue-report"
                style={{ paddingTop: '0px', paddingLeft: '15px' }}
              >
                <div className="row m-t-10 b-b-default m-l-10">
                  <div className="col-sm-12">
                    <h6 className="text-muted d-inline-block">ID</h6>
                    <h6 className="d-inline-block m-l-20 f-w-400">
                      {this.explorerStore.transaction.id}
                    </h6>
                  </div>
                </div>
                <div className="row m-l-5 m-t-30 m-b-15">
                  <div className="col-sm-12 col-md-6">
                    <h6 className="text-muted d-inline-block">
                      <FormattedMessage id="Block" /> :
                    </h6>
                    <h6 className="d-inline-block m-l-10 f-w-400">
                      <NumberFormat
                        value={this.explorerStore.transaction.block_num}
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                    </h6>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <h6 className="text-muted d-inline-block">
                      <FormattedMessage id="Status" /> :
                    </h6>
                    <h6 className="d-inline-block m-l-10 f-w-400">
                      {this.explorerStore.transaction.trx.receipt.status}
                    </h6>
                  </div>
                </div>
                <div className="row m-l-5 m-t-10 m-b-15">
                  <div className="col-sm-12 col-md-6">
                    <h6 className="text-muted d-inline-block">
                      <FormattedMessage id="CPU" /> :
                    </h6>
                    <h6 className="d-inline-block m-l-10 f-w-400">
                      <NumberFormat
                        value={this.explorerStore.transaction.trx.receipt.cpu_usage_us}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' µs'}
                      />
                    </h6>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <h6 className="text-muted d-inline-block">
                      <FormattedMessage id="NET" /> :
                    </h6>
                    <h6 className="d-inline-block m-l-10 f-w-400">
                      <NumberFormat
                        value={this.explorerStore.transaction.trx.receipt.net_usage_words}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' words'}
                      />
                    </h6>
                  </div>
                </div>
                <div className="row m-l-5 m-t-10 m-b-15">
                  <div className="col-sm-12 col-md-6">
                    <h6 className="text-muted d-inline-block">
                      <FormattedMessage id="Block Time" /> :
                    </h6>
                    <h6 className="d-inline-block m-l-10 f-w-400">
                      {format(
                        new Date(this.explorerStore.transaction.block_time),
                        'YYYY-MM-DD HH:mm:ss.SSS'
                      )}
                    </h6>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <h6 className="text-muted d-inline-block">
                      <FormattedMessage id="Expiration Time" /> :
                    </h6>
                    <h6 className="d-inline-block m-l-10 f-w-400">
                      {this.explorerStore.transaction.trx &&
                      this.explorerStore.transaction.trx.trx &&
                      this.explorerStore.transaction.trx.trx.expiration
                        ? format(
                          new Date(this.explorerStore.transaction.trx.trx.expiration),
                          'YYYY-MM-DD HH:mm:ss.SSS'
                        )
                        : '-'}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h5>
                <FormattedMessage id="Actions" />
              </h5>
              <h5>
                {this.explorerStore.transaction.traces && (
                  <NumberFormat
                    value={this.explorerStore.transaction.traces.length}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'('}
                    suffix={')'}
                  />
                )}
              </h5>
            </div>
            <div className="card-block">
              <div className="dt-responsive table-responsive">
                {this.explorerStore.transaction.traces &&
                  this.explorerStore.transaction.traces.length === 0 && (
                    <table id="base-style" className="table table-striped table-bordered nowrap">
                      <thead>
                        <tr>
                          <th>
                            <FormattedMessage id="ID" />
                          </th>
                          <th>
                            <FormattedMessage id="TYPE" />
                          </th>
                          <th>
                            <FormattedMessage id="ACTOR" />
                          </th>
                          <th>
                            <FormattedMessage id="RECEIVER" />
                          </th>
                          <th>
                            <FormattedMessage id="DATA" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colsPan="5" className="text-center">
                            <FormattedMessage id="No Actions" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                {this.explorerStore.transaction.traces &&
                  this.explorerStore.transaction.traces.length > 0 && (
                    <table
                      id="base-style"
                      className="table table-striped table-bordered"
                      style={{ tableLayout: 'fixed' }}
                    >
                      <thead>
                        <tr>
                          <th style={{ width: '10%' }}>
                            <FormattedMessage id="ID" />
                          </th>
                          <th style={{ width: '10%' }}>
                            <FormattedMessage id="TYPE" />
                          </th>
                          <th style={{ width: '10%' }}>
                            <FormattedMessage id="ACTOR" />
                          </th>
                          <th style={{ width: '10%' }}>
                            <FormattedMessage id="RECEIVER" />
                          </th>
                          <th style={{ width: '60%' }}>
                            <FormattedMessage id="DATA" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.explorerStore.transaction.traces.map((action, index) => (
                          <tr key={index}>
                            <td style={{ whiteSpace: 'normal' }}>
                              {action.receipt.global_sequence}
                            </td>
                            <td style={{ whiteSpace: 'normal' }}>{action.act.name}</td>
                            <td style={{ whiteSpace: 'normal' }}>
                              {action.act.authorization.length > 0 ? (
                                <Link to={'/blockexplorers/' + action.act.authorization[0].actor}>
                                  <span className="text-c-blue">
                                    {action.act.authorization[0].actor}
                                  </span>
                                </Link>
                              ) : (
                                'NONE'
                              )}
                            </td>
                            <td style={{ whiteSpace: 'normal' }}>
                              <Link to={'/blockexplorers/' + action.receipt.receiver}>
                                <span className="text-c-blue">{action.receipt.receiver}</span>
                              </Link>
                            </td>
                            <td style={{ whiteSpace: 'normal' }}>
                              {JSON.stringify(action.act.data)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default TransactionView
