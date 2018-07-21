import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'
import { format } from 'date-fns'

@inject('explorerStore')
@observer
class BlockView extends Component {
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
                <h5>
                  <FormattedMessage id="Block" />
                </h5>
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
                      #<NumberFormat
                        value={this.explorerStore.block.block_num}
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                    </h6>
                  </div>
                </div>
                <div className="row m-l-5 m-t-30 m-b-15">
                  <div className="col-sm-12">
                    <h6 className="text-muted d-inline-block">
                      <FormattedMessage id="Block" /> :
                    </h6>
                    <h6 className="d-inline-block m-l-10 f-w-400">
                      <NumberFormat
                        value={this.explorerStore.block.block_num}
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                    </h6>
                  </div>
                </div>
                <div className="row m-l-5 m-t-10 m-b-15">
                  <div className="col-sm-12">
                    <h6 className="text-muted d-inline-block">
                      <FormattedMessage id="Block Producer" /> :
                    </h6>
                    <h6 className="d-inline-block m-l-10 f-w-400">
                      {this.explorerStore.block.producer}
                    </h6>
                  </div>
                </div>
                <div className="row m-l-5 m-t-10 m-b-15">
                  <div className="col-sm-12">
                    <h6 className="text-muted d-inline-block">
                      <FormattedMessage id="Created" /> :
                    </h6>
                    <h6 className="d-inline-block m-l-10 f-w-400">
                      {format(
                        new Date(this.explorerStore.block.timestamp),
                        'YYYY-MM-DD HH:mm:ss.SSS'
                      )}
                    </h6>
                  </div>
                </div>
                <div className="row m-l-5 m-t-10 m-b-15">
                  <div className="col-sm-12">
                    <h6 className="text-muted d-inline-block">
                      <FormattedMessage id="Block ID" /> :
                    </h6>
                    <h6 className="d-inline-block m-l-10 f-w-400">{this.explorerStore.block.id}</h6>
                  </div>
                </div>
                <div className="row m-l-5 m-t-10 m-b-15">
                  <div className="col-sm-12">
                    <h6 className="text-muted d-inline-block">
                      <FormattedMessage id="Previous Block ID" /> :
                    </h6>
                    <h6 className="d-inline-block m-l-10 f-w-400">
                      {this.explorerStore.block.previous}
                    </h6>
                  </div>
                </div>
                <div className="row m-l-5 m-t-10 m-b-15">
                  <div className="col-sm-12">
                    <h6 className="text-muted d-inline-block">
                      <FormattedMessage id="Transaction Merkle Root" /> :
                    </h6>
                    <h6 className="d-inline-block m-l-10 f-w-400">
                      {this.explorerStore.block.transaction_mroot}
                    </h6>
                  </div>
                </div>
                <div className="row m-l-5 m-t-10 m-b-15">
                  <div className="col-sm-12">
                    <h6 className="text-muted d-inline-block">
                      <FormattedMessage id="Actions Merkle Root" /> :
                    </h6>
                    <h6 className="d-inline-block m-l-10 f-w-400">
                      {this.explorerStore.block.action_mroot}
                    </h6>
                  </div>
                </div>
                <div className="row m-l-5 m-t-10 m-b-15">
                  <div className="col-sm-12">
                    <h6 className="text-muted d-inline-block">
                      <FormattedMessage id="Transactions" /> :
                    </h6>
                    <h6 className="d-inline-block m-l-10 f-w-400">
                      <NumberFormat
                        value={this.explorerStore.block.transactions.length}
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                    </h6>
                  </div>
                </div>
                <div className="row m-l-5 m-t-10 m-b-15">
                  <div className="col-sm-12">
                    <h6 className="text-muted d-inline-block">
                      <FormattedMessage id="Confirmations" /> :
                    </h6>
                    <h6 className="d-inline-block m-l-10 f-w-400">
                      <NumberFormat
                        value={this.explorerStore.block.confirmed}
                        displayType={'text'}
                        thousandSeparator={true}
                      />
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
                <FormattedMessage id="Transactions" />
              </h5>
              <h5>
                {this.explorerStore.block.transactions && (
                  <NumberFormat
                    value={this.explorerStore.block.transactions.length}
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
                {this.explorerStore.block.transactions &&
                  this.explorerStore.block.transactions.length === 0 && (
                    <table id="base-style" className="table table-striped table-bordered nowrap">
                      <thead>
                        <tr>
                          <th style={{ width: '60%' }}>
                            <FormattedMessage id="TRANSACTION ID" />
                          </th>
                          <th style={{ width: '10%' }}>
                            <FormattedMessage id="ACTIONS" />
                          </th>
                          <th style={{ width: '30%' }}>
                            <FormattedMessage id="EXPIRATION" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="3" className="text-center">
                            <FormattedMessage id="No Transactions" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                {this.explorerStore.block.transactions &&
                  this.explorerStore.block.transactions.length > 0 && (
                    <table
                      id="base-style"
                      className="table table-striped table-bordered"
                      style={{ tableLayout: 'fixed' }}
                    >
                      <thead>
                        <tr>
                          <th style={{ width: '60%' }}>
                            <FormattedMessage id="TRANSACTION ID" />
                          </th>
                          <th style={{ width: '10%' }}>
                            <FormattedMessage id="ACTIONS" />
                          </th>
                          <th style={{ width: '30%' }}>
                            <FormattedMessage id="EXPIRATION" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.explorerStore.block.transactions.map((transaction, index) => (
                          <tr key={index}>
                            <td style={{ whiteSpace: 'normal' }}>
                              <Link to={'/blockexplorers/' + transaction.trx.id}>
                                <span className="text-c-blue">{transaction.trx.id}</span>
                              </Link>
                            </td>
                            <td style={{ whiteSpace: 'normal' }}>
                              {transaction.trx.transaction.actions.length}
                            </td>
                            <td style={{ whiteSpace: 'normal' }}>
                              {format(
                                new Date(transaction.trx.transaction.expiration),
                                'YYYY-MM-DD HH:mm:ss.SSS'
                              )}
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

export default BlockView
