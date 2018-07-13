import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'

@inject('accountStore')
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
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-body">
              <div className="row">
                <div className="col-md-6 col-xl-3">
                  <div className="card bg-c-pink order-card">
                    <div className="card-block">
                      <h6 className="m-b-20">Balance</h6>
                      <h2 className="text-right">
                        <i className="ti-wallet f-left" />
                        {this.accountStore.accountInfo && (
                          <span>
                            <NumberFormat
                              value={this.accountStore.eosBalance}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={' EOS'}
                            />
                          </span>
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
                      <h6 className="m-b-20">Ram owned</h6>
                      <h2 className="text-right">
                        <i className="ti-save f-left" />
                        {this.accountStore.accountInfo && (
                          <span>
                            <NumberFormat
                              value={this.accountStore.accountInfo.ram_quota}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={' bytes'}
                            />
                          </span>
                        )}
                      </h2>
                      <p className="m-b-0">
                        Ram usage
                        {this.accountStore.accountInfo && (
                          <span className="f-right">
                            <NumberFormat
                              value={this.accountStore.accountInfo.ram_usage}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={' bytes'}
                            />
                          </span>
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
                          <span className="f-right">
                            <NumberFormat
                              value={this.accountStore.accountInfo.cpu_limit.max}
                              displayType={'text'}
                              thousandSeparator={true}
                            />
                          </span>
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
                        <i className="ti-signal f-left" />
                        {this.accountStore.accountInfo && (
                          <span>
                            <NumberFormat
                              value={this.accountStore.accountInfo.total_resources.net_weight}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={' EOS'}
                            />
                          </span>
                        )}
                      </h2>
                      <p className="m-b-0">
                        Net max
                        {this.accountStore.accountInfo && (
                          <span className="f-right">
                            <NumberFormat
                              value={this.accountStore.accountInfo.net_limit.max}
                              displayType={'text'}
                              thousandSeparator={true}
                            />
                          </span>
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
