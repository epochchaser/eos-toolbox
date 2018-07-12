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
        <div class="page-body">
          <div class="row">
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
            <div class="col-md-6 col-xl-3">
              <div class="card bg-c-blue order-card">
                <div class="card-block">
                  <h6 class="m-b-20">Ram usage</h6>
                  <h2 class="text-right">
                    <i class="ti-shopping-cart f-left" />
                    {this.accountStore.accountInfo && (
                      <span>{`${this.accountStore.accountInfo.ram_usage} bytes`}</span>
                    )}
                  </h2>
                  <p class="m-b-0">
                    Ram owned
                    {this.accountStore.accountInfo && (
                      <span class="f-right">{`${
                        this.accountStore.accountInfo.ram_quota
                      } bytes`}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xl-3">
              <div class="card bg-c-green order-card">
                <div class="card-block">
                  <h6 class="m-b-20">Net used</h6>
                  <h2 class="text-right">
                    <i class="ti-tag f-left" />
                    {this.accountStore.accountInfo && (
                      <span>{`${this.accountStore.accountInfo.net_limit.used} EOS`}</span>
                    )}
                  </h2>
                  <p class="m-b-0">
                    Net weight
                    {this.accountStore.accountInfo && (
                      <span class="f-right">{`${
                        this.accountStore.accountInfo.net_weight
                      } EOS`}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xl-3">
              <div class="card bg-c-yellow order-card">
                <div class="card-block">
                  <h6 class="m-b-20">Cpu used</h6>
                  <h2 class="text-right">
                    <i class="ti-reload f-left" />
                    {this.accountStore.accountInfo && (
                      <span>{`${this.accountStore.accountInfo.cpu_limit.used} EOS`}</span>
                    )}
                  </h2>
                  <p class="m-b-0">
                    Cpu weight
                    {this.accountStore.accountInfo && (
                      <span class="f-right">{`${
                        this.accountStore.accountInfo.cpu_weight
                      } EOS`}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default MyAccountView
