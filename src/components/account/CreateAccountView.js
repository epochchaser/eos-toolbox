import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'
import EosAgent from '../../EosAgent'
import Swal from 'sweetalert2'

@inject('accountStore')
@observer
class CreateAccountView extends Component {
  render() {
    const { accountStore } = this.props

    return (
      accountStore &&
      accountStore.account &&
      accountStore.accountInfo && (
        <div className="col-sm-12">
          <div className="card">
            <div className="card-block">
              <div className="row">
                <div className="col-lg-6 offset-lg-3 m-t-10">
                  <h5 className="txt-highlight text-center">
                    <FormattedMessage id="Claim Refund" />
                  </h5>
                  <p className="text-muted text-center m-t-20">
                    <FormattedMessage id="By executing this action you are agreeing to the EOS constitution and this actions associated ricardian contract." />
                  </p>
                </div>
                <div className="col-lg-6 offset-lg-3">
                  <div className="card-block text-center">
                    <i className="fa fa-sign-in text-c-green d-block f-40" />
                    <h4 className="m-t-20">
                      {`${parseFloat(
                        accountStore.accountInfo.refund_request.cpu_amount.split(' ')[0]
                      ) +
                        parseFloat(
                          accountStore.accountInfo.refund_request.net_amount.split(' ')[0]
                        )}`}{' '}
                      EOS
                    </h4>
                    <p className="m-b-20">
                      <FormattedMessage id="Unstaked amount" />
                    </p>
                    <button className="btn btn-success btn-md btn-round" onClick={this.claimRefund}>
                      <FormattedMessage id="Claim" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    )
  }
}

export default CreateAccountView
