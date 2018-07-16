import React, { Component } from 'react'
import { inject, observer } from '../../node_modules/mobx-react'
import sortBy from 'lodash/sortBy'

@inject('eosioStore', 'accountStore')
@observer
class BlockProducersView extends Component {
  componentDidMount = async () => {
    const { eosioStore } = this.props
    eosioStore.getBlockProducers()
  }

  onCheckChange = name => event => {
    const { accountStore } = this.props
    const { myBlockProducers } = accountStore

    const checked = event.target.checked
    let filterBaseBPList = myBlockProducers.filter(bp => bp !== name)

    if (checked) {
      filterBaseBPList = filterBaseBPList.concat(name)
    }
    accountStore.updateMyBlockProducers(filterBaseBPList)
  }

  render() {
    const { eosioStore } = this.props
    const { blockProducers } = eosioStore

    return (
      <div className="card">
        <div className="card-header">
          <h5>Producers</h5>
          <span>
            vote to <code>BLOCK PRODUCERS</code> that you want
          </span>
        </div>
        <div className="card-block table-border-style">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>V</th>
                  <th>Producer</th>
                  <th>%</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {blockProducers &&
                  blockProducers.map((p, index) => (
                    <tr key={p.key}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id={p.owner}
                            onChange={this.onCheckChange(p.owner)}
                          />
                        </div>
                      </td>
                      <td>{p.owner}</td>
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

export default BlockProducersView
