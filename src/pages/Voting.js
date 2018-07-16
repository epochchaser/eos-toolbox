import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('eosioStore')
@observer
class Voting extends Component {
  componentDidMount = async () => {
    const { eosioStore } = this.props
    eosioStore.getBlockProducers()
  }

  render() {
    const { blockProducers } = this.props.eosioStore
    return (
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
                      <td>{p.percent}</td>
                      <td>{p.isBackup}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Voting
