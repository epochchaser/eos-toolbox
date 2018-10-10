import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'

@inject('explorerStore')
@observer
class SmartContractView extends Component {
  render() {
    const { explorerStore } = this.props

    return !explorerStore.isLoading && explorerStore.account && explorerStore.account.contract ? (
      <div className="col-sm-12">
        <div className="card">
          <div className="card-header">
            <h5>
              <FormattedMessage id="Contract" />
            </h5>
          </div>
          <div className="card-block">
            <div className="dt-responsive table-responsive">
              {explorerStore.account.contract.structs && (
                <table id="base-style" className="table table-bordered nowrap">
                  <thead>
                    <tr>
                      <th style={{ width: '30%' }}>
                        <FormattedMessage id="NAME" />
                      </th>
                      <th style={{ width: '70%' }}>
                        <FormattedMessage id="FIELDS" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {explorerStore.account.contract.structs.map(v => (
                      <tr>
                        <td className="text-center">{v.name}</td>

                        <td>
                          <div className="row">
                            {v.fields.map(f => (
                              <div className="col-md-4 col-sm-6" key={f.name}>
                                <div className="card user-card">
                                  <div className="card-header">
                                    <h5>{f.name}</h5>
                                  </div>
                                  <div className="card-block">
                                    <h4>{f.type}</h4>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
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
    ) : (
      <div />
    )
  }
}

export default SmartContractView
