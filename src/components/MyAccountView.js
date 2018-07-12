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
        <div class="main-body">
          <div class="page-wrapper">
            <div className="page-body">
              <div className="row">
                <div className="col-md-6 col-xl-3">
                  <div className="card bg-c-pink order-card">
                    <div className="card-block">
                      <h6 className="m-b-20">Balance</h6>
                      <h2 className="text-right">
                        <i className="ti-wallet f-left" />
                        {this.accountStore.accountInfo && (
                          <span>{`${this.accountStore.eosBalance} EOS`}</span>
                        )}
                      </h2>
                      <p className="m-b-0">
                        Account
                        {this.accountStore.isLogin && (
                          <span className="f-right">{this.accountStore.account.name}</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-3">
                  <div className="card bg-c-blue order-card">
                    <div className="card-block">
                      <h6 className="m-b-20">Ram usage</h6>
                      <h2 className="text-right">
                        <i className="ti-shopping-cart f-left" />
                        {this.accountStore.accountInfo && (
                          <span>{`${this.accountStore.accountInfo.ram_usage} bytes`}</span>
                        )}
                      </h2>
                      <p className="m-b-0">
                        Ram owned
                        {this.accountStore.accountInfo && (
                          <span className="f-right">{`${
                            this.accountStore.accountInfo.ram_quota
                          } bytes`}</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-3">
                  <div className="card bg-c-green order-card">
                    <div className="card-block">
                      <h6 className="m-b-20">Net weight</h6>
                      <h2 className="text-right">
                        <i className="ti-tag f-left" />
                        {this.accountStore.accountInfo && (
                          <span>{`${
                            this.accountStore.accountInfo.total_resources.net_weight
                          }`}</span>
                        )}
                      </h2>
                      <p className="m-b-0">
                        Net max
                        {this.accountStore.accountInfo && (
                          <span className="f-right">{`${
                            this.accountStore.accountInfo.net_limit.max
                          } `}</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-3">
                  <div className="card bg-c-yellow order-card">
                    <div className="card-block">
                      <h6 className="m-b-20">Cpu weight</h6>
                      <h2 className="text-right">
                        <i className="ti-reload f-left" />
                        {this.accountStore.accountInfo && (
                          <span>{`${
                            this.accountStore.accountInfo.total_resources.cpu_weight
                          } `}</span>
                        )}
                      </h2>
                      <p className="m-b-0">
                        Cpu max
                        {this.accountStore.accountInfo && (
                          <span className="f-right">{`${
                            this.accountStore.accountInfo.cpu_limit.max
                          } `}</span>
                        )}
                      </p>
                    </div>
                  </div>
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
