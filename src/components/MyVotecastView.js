import React, { Component } from 'react'
import { inject, observer } from '../../node_modules/mobx-react'

@inject('accountStore')
@observer
class MyVotecastView extends Component {
  render() {
    const { accountStore } = this.props
    const { myBlockProducers } = accountStore

    return (
      <div className="card">
        <div className="card-header">
          <h5>Your vote cast</h5>
          <span>
            your <code>BLOCK PRODUCER </code> list
          </span>
        </div>

        <div class="card-block">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="form-group">
                <button class="btn btn-primary btn-block">Set voter proxy</button>
                <button class="btn btn-danger btn-block">
                  Submit votes for selected producers
                </button>
              </div>
            </div>
          </div>
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
                {myBlockProducers &&
                  myBlockProducers.map((v, index) => (
                    <tr key={v}>
                      <th scope="row">{index + 1}</th>
                      <td>{v}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {!myBlockProducers && (
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

export default MyVotecastView
