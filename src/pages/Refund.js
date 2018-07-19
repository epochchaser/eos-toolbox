import React, { Component, Fragment } from 'react'
import RefundView from '../components/account/RefundView'
import { inject, observer } from '../../node_modules/mobx-react'

@inject('accountStore')
@observer
class Refund extends Component {
  render() {
    const { accountStore } = this.props

    return (
      accountStore &&
      accountStore.accountInfo && (
        <Fragment>
          <div className="page-wrapper">
            <div className="page-body">
              <div className="row">
                <RefundView />
              </div>
            </div>
          </div>
        </Fragment>
      )
    )
  }
}

export default Refund
