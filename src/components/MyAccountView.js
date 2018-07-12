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
        <div class="col-md-6 col-xl-3">
          <div class="card bg-c-pink order-card">
            <div class="card-block">
              <h6 class="m-b-20">Balance</h6>
              <h2 class="text-right">
                <i class="ti-wallet f-left" />
                {this.accountStore.accountInfo && (
                  <span>{`${this.accountStore.eosBalance} EOS`}</span>
                )}
              </h2>
              <p class="m-b-0">
                Account
                {this.accountStore.isLogin && (
                  <span class="f-right">{this.accountStore.account.name}</span>
                )}
              </p>
            </div>
          </div>
        </div>
        {/* {this.accountStore.isLogin && <div>{this.accountStore.account.name}</div>}
        {this.accountStore.accountInfo && <div>{this.accountStore.eosBalance} EOS</div>} */}
      </Fragment>
    )
  }
}

export default MyAccountView
