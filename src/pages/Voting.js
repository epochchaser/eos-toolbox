import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('eosioStore')
class Voting extends Component {
  constructor(props) {
    console.log('가자')
    super(props)
    let { eosioStore } = this.props
    this.eosioStore = eosioStore
  }

  componentDidMount = () => {
    this.eosioStore.getProducers()
  }

  render() {
    return (
      <div class="card">
        <div class="card-header">
          <h5>Producers</h5>
          <span>
            vote to <code>BLOCK PRODUCERS</code> that you want
          </span>
          <div class="card-header-right">
            <ul class="list-unstyled card-option">
              <li>
                <i class="fa fa-chevron-left" />
              </li>
              <li>
                <i class="fa fa-window-maximize full-card" />
              </li>
              <li>
                <i class="fa fa-minus minimize-card" />
              </li>
              <li>
                <i class="fa fa-refresh reload-card" />
              </li>
              <li>
                <i class="fa fa-times close-card" />
              </li>
            </ul>
          </div>
        </div>
        <div class="card-block table-border-style">
          <div class="table-responsive">
            <table class="table">
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
