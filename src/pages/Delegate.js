import React, { Component, Fragment } from 'react'
import MyResourceView from '../components/account/MyResourceView'
import DelegateView from '../components/account/DelegateView'
import { inject, observer } from '../../node_modules/mobx-react'

@inject('accountStore')
@observer
class Delegate extends Component {
  render() {
    const { accountStore } = this.props
    return (
      accountStore &&
      accountStore.accountInfo && (
        <Fragment>
          <div className="page-wrapper">
            <div className="page-body">
              <MyResourceView />
              <DelegateView />
              <div className="row" />
            </div>
          </div>
        </Fragment>
      )
    )
  }
}

export default Delegate
