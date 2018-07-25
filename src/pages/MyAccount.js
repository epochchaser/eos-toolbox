import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import MyAccountView from '../components/account/MyAccountView'
import ResourceView from '../components/account/ResourceView'
import ActionView from '../components/account/ActionView'
import NeedLoginView from '../components/NeedLoginView'

@inject('accountStore', 'commonStore')
@observer
class MyAccount extends Component {
  constructor(props) {
    super(props)
    let { accountStore, commonStore } = this.props
    this.accountStore = accountStore
    this.commonStore = commonStore
  }

  render() {
    return (
      <div>
        {this.accountStore.isLogin &&
          this.accountStore.accountInfo && (
            <Fragment>
              <MyAccountView />
              {/* <ResourceView /> */}
              <ActionView />
            </Fragment>
          )}
        {!this.commonStore.isLoading && !this.accountStore.isLogin && <NeedLoginView />}
      </div>
    )
  }
}

export default MyAccount
