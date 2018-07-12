import React, { Component, Fragment } from "react"
import { inject, observer } from "mobx-react"

@inject("accountStore")
@observer
class MyAccountView extends Component {
  constructor(props) {
    super(props)
    let { accountStore } = this.props
    this.accountStore = accountStore
  }

  render() {
    return (
      <Fragment>
        {
            this.accountStore.isLogin &&
            <div>{this.accountStore.account.name}</div>
        }
        {
            this.accountStore.accountInfo &&
            <div>{this.accountStore.eosBalance} EOS</div>
        }
      </Fragment>
    )
  }
}

export default MyAccountView
