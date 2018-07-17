import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'
import { format } from 'date-fns'

@inject('explorerStore')
@observer
class AccountView extends Component {
  constructor(props) {
    super(props)
    let { explorerStore } = this.props
    this.explorerStore = explorerStore
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card user-card">
            <div className="card-header">
              <h5>
                <FormattedMessage id="Profile" />
              </h5>
            </div>
            <div className="card-block">
              <div className="usre-image">
                <img
                  src="https://steemitimages.com/DQmeY3HLRU3Q2dhKgdqcuj52sbw7wdQdBvzzCjP2s2izNdU/2017-05-11%20(2).png"
                  className="img-radius"
                  alt="EOS Logo"
                  style={{ width: '100px', height: '100px' }}
                />
              </div>
              <h6 className="f-w-600 m-t-25 m-b-10">{this.explorerStore.account.account_name}</h6>
              <p className="text-muted">
                <FormattedMessage id="Created" />{' '}
                {format(new Date(this.explorerStore.account.created), 'YYYY-MM-DD HH:mm:ss.sss')}
              </p>
              <hr />
              <p className="text-muted m-t-15">
                Total :{' '}
                <NumberFormat
                  value={this.explorerStore.account.total.toFixed(4)}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={' EOS'}
                />
              </p>
              <div className="bg-c-blue counter-block m-t-10 p-20">
                <div className="row">
                  <div className="col-4">
                    <p>Unstake</p>
                    <p>
                      <NumberFormat
                        value={this.explorerStore.account.unstake.toFixed(4)}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' EOS'}
                      />
                    </p>
                  </div>
                  <div className="col-4">
                    <p>Stake</p>
                    <p>
                      <NumberFormat
                        value={this.explorerStore.account.stake.toFixed(4)}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' EOS'}
                      />
                    </p>
                  </div>
                  <div className="col-4">
                    <p>Refund</p>
                    <p>
                      <NumberFormat
                        value={this.explorerStore.account.refund.toFixed(4)}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' EOS'}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="row">
            <div className="col-md-12">
              <div className="card statustic-card">
                <div className="card-header">
                  <h5>
                    <FormattedMessage id="Total Staking" />
                  </h5>
                </div>
                <div className="card-block text-center">
                  <span className="d-block text-c-blue f-36">123</span>
                  <div className="progress">
                    <div className="progress-bar bg-c-blue" />
                  </div>
                </div>
                <div className="card-footer bg-c-blue">
                  <h6 className="text-white m-b-0">123</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card statustic-card">
                <div className="card-header">
                  <h5>
                    <FormattedMessage id="Total Staking" />
                  </h5>
                </div>
                <div className="card-block text-center">
                  <span className="d-block text-c-blue f-36">123</span>
                  <div className="progress">
                    <div className="progress-bar bg-c-blue" />
                  </div>
                </div>
                <div className="card-footer bg-c-blue">
                  <h6 className="text-white m-b-0">123</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="row">
            <div className="col-md-12">
              <div className="card statustic-card">
                <div className="card-header">
                  <h5>
                    <FormattedMessage id="Total Staking" />
                  </h5>
                </div>
                <div className="card-block text-center">
                  <span className="d-block text-c-blue f-36">123</span>
                  <div className="progress">
                    <div className="progress-bar bg-c-blue" />
                  </div>
                </div>
                <div className="card-footer bg-c-blue">
                  <h6 className="text-white m-b-0">123</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card statustic-card">
                <div className="card-header">
                  <h5>
                    <FormattedMessage id="Total Staking" />
                  </h5>
                </div>
                <div className="card-block text-center">
                  <span className="d-block text-c-blue f-36">123</span>
                  <div className="progress">
                    <div className="progress-bar bg-c-blue" />
                  </div>
                </div>
                <div className="card-footer bg-c-blue">
                  <h6 className="text-white m-b-0">123</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountView
