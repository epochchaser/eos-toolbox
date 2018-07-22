import React, { Component, Fragment } from 'react'
import TransferTokenView from '../components/account/TransferTokenView'
import { inject, observer } from '../../node_modules/mobx-react'

@inject('accountStore')
@observer
class Transfer extends Component {
  render() {
    const { accountStore } = this.props
    return (
      accountStore &&
      accountStore.accountInfo && (
        <Fragment>
          <div className="page-wrapper">
            <div className="page-body">
              <TransferTokenView />
              <div className="row" />
            </div>
          </div>
        </Fragment>
      )
    )
  }
}

export default Transfer
