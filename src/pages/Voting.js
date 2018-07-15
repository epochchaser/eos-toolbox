import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('eosioStore')
class Voting extends Component {
  componentDidMount = () => {
    const { eosioStore } = this.props
    eosioStore.getProducers()
  }

  render() {
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>starteosiobp</td>
                  <td>2.73%</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>eos42freedom</td>
                  <td>2.66%</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>eoscanadacom</td>
                  <td>2.65%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Voting
