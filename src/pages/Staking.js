import React, { Component, Fragment } from 'react'
import MyResourceView from '../components/account/MyResourceView'
import StakingView from '../components/account/StakingView'
import { inject, observer } from '../../node_modules/mobx-react'

@inject('accountStore')
@observer
class Staking extends Component {
  render() {
    const { accountStore } = this.props
    return (
      accountStore &&
      accountStore.accountInfo && (
        <Fragment>
          <div className="page-wrapper">
            <div className="page-body">
              <MyResourceView />
              <StakingView />
              <div className="row" />
            </div>
          </div>
        </Fragment>
      )
    )
  }
}

export default Staking
