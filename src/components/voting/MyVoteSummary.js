import React, { Component } from 'react'
import { inject, observer } from '../../../node_modules/mobx-react'
import { FormattedMessage } from 'react-intl'

@inject('accountStore', 'eosioStore')
@observer
class MyVoteSummary extends Component {
  render() {
    const { accountStore } = this.props
    const { myBlockProducers, staked, totalBalance } = accountStore

    const stakedPercent = (totalBalance === 0 ? 0 : (staked / totalBalance) * 100) + '%'
    let myProducersLength = 0
    let myVotesPercent = 0.0

    if (myBlockProducers) {
      myProducersLength = myBlockProducers.length
      myVotesPercent = (myProducersLength / 21) * 100 + '%'
    }

    return (
      <div className="card summery-card">
        <div className="card-header">
          <div className="card-header-left ">
            <h5>
              <FormattedMessage id="Summery" />
            </h5>
          </div>
        </div>
        <div className="card-block">
          <div className="row">
            <div className="col-sm-6 b-r-default p-b-40">
              <h2 className="f-w-400">{`${myProducersLength} / 21`}</h2>
              <p className="text-muted f-w-400">
                <FormattedMessage id="Your votes" />
              </p>
              <div className="progress">
                <div
                  className="progress-bar bg-c-blue"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: myVotesPercent }}
                />
              </div>
            </div>
            <div className="col-sm-6 p-b-40">
              <h2 className="f-w-400">{`${staked.toFixed(4)} / ${totalBalance.toFixed(4)}`} EOS</h2>
              <p className="text-muted f-w-400">
                <FormattedMessage id="Staked" />
              </p>
              <div className="progress">
                <div
                  className="progress-bar bg-c-pink"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: stakedPercent }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MyVoteSummary
