import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import MyAccountView from '../components/MyAccountView'
import ResourceView from '../components/ResourceView'
import NeedLoginView from '../components/NeedLoginView'

@inject('accountStore')
@observer
class MyAccount extends Component {
  constructor(props) {
    super(props)
    let { accountStore } = this.props
    this.accountStore = accountStore
  }

  render() {
    return (
      <div>
        {this.accountStore.isLogin && this.accountStore.accountInfo ? (
          <Fragment>
            <MyAccountView />
            <ResourceView />
          </Fragment>
        ) : (
          <NeedLoginView />
        )}
      </div>
    )
  }
}

export default MyAccount
