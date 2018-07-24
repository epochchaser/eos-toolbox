import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

@inject('explorerStore')
@observer
class ActionHistoryView extends Component {
  render() {
    const { explorerStore } = this.props
    return (
      explorerStore && (
        <div className="card">
          <div className="card-header">
            <h5>
              <FormattedMessage id="Actions" />
            </h5>
            <h5>
              {explorerStore.actions && (
                <NumberFormat
                  value={explorerStore.actions.length}
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
              {explorerStore.isActionLoading && (
                <div className="preloader3 loader-block m-t-20" style={{ height: '9px' }}>
                  <div className="circ1" />
                  <div className="circ2" />
                  <div className="circ3" />
                  <div className="circ4" />
                </div>
              )}
              {explorerStore.actions &&
                explorerStore.actions.length === 0 && (
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
                          <FormattedMessage id="DATA" />
                        </th>
                        <th>
                          <FormattedMessage id="TRANSACTION ID" />
                        </th>
                        <th>
                          <FormattedMessage id="DATE" />
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
              {explorerStore.actions &&
                explorerStore.actions.length > 0 && (
                  <table
                    id="base-style"
                    className="table table-striped table-bordered"
                    style={{ tableLayout: 'fixed' }}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: '8%' }}>
                          <FormattedMessage id="ID" />
                        </th>
                        <th style={{ width: '8%' }}>
                          <FormattedMessage id="TYPE" />
                        </th>
                        <th style={{ width: '40%' }}>
                          <FormattedMessage id="DATA" />
                        </th>
                        <th style={{ width: '34%' }}>
                          <FormattedMessage id="TRANSACTION ID" />
                        </th>
                        <th style={{ width: '10%' }}>
                          <FormattedMessage id="DATE" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {explorerStore.actions.map((action, index) => (
                        <tr key={index}>
                          <td style={{ whiteSpace: 'normal' }}>{action.global_action_seq}</td>
                          <td style={{ whiteSpace: 'normal' }}>{action.action_trace.act.name}</td>
                          <td style={{ whiteSpace: 'normal' }}>
                            {JSON.stringify(action.action_trace.act.data)}
                          </td>
                          <td style={{ whiteSpace: 'normal' }}>
                            <Link to={'/blockexplorers/' + action.action_trace.trx_id}>
                              <span className="text-c-blue">{action.action_trace.trx_id}</span>
                            </Link>
                          </td>
                          <td style={{ whiteSpace: 'normal' }}>
                            {format(new Date(action.block_time), 'YYYY-MM-DD HH:mm:ss.SSS')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
            </div>
          </div>
        </div>
      )
    )
  }
}

export default ActionHistoryView
