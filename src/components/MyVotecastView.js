import React, { Component } from 'react'
import { inject, observer } from '../../node_modules/mobx-react'

@inject('accountStore')
@observer
class MyVotecastView extends Component {
  render() {
    const { accountStore } = this.props
    const { accountInfo } = accountStore

    return (
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
    )
  }
}

export default MyVotecastView
