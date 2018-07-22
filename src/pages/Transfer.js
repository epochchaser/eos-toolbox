import React, { Component, Fragment } from 'react'
import TransferTokenView from '../components/account/TransferTokenView'
import NeedLoginView from '../components/NeedLoginView'
import { inject, observer } from '../../node_modules/mobx-react'

@inject('accountStore', 'commonStore')
@observer
class Transfer extends Component {
  constructor(props) {
    super(props)
    const { commonStore, accountStore } = this.props
    this.commonStore = commonStore
    this.accountStore = accountStore
  }

  render() {
    return (
      <div>
        {this.accountStore &&
          this.accountStore.accountInfo && (
            <Fragment>
              <div className="page-wrapper">
                <div className="page-body">
                  <TransferTokenView />
                  <div className="row" />
                </div>
              </div>
            </Fragment>
          )}

        {!this.commonStore.isLoading && !this.accountStore.isLogin && <NeedLoginView />}
      </div>
    )
  }
}

export default Transfer
