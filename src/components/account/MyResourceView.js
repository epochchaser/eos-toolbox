import React, { Component, Fragment } from 'react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'
import { inject, observer } from 'mobx-react'

@inject('accountStore')
@observer
class MyResourceView extends Component {
  render() {
    const { accountStore } = this.props
    const unstaked = accountStore.totalBalance - accountStore.staked

    return (
      <Fragment>
        <div className="row">
          <div className="col-md-12 col-xl-12">
            <div className="card task-sale-card ">
              <div className="card-header ">
                <div className="card-header-left ">
                  <h5>
                    <FormattedMessage id="Your Resource Summary" />
                  </h5>
                </div>
              </div>

              <div className="row ">
                <div className="col-sm-6 ">
                  <div className="card-block-big b-r-default">
                    <h2 className="text-c-blue d-inline-block m-b-40 f-50 ">
                      <NumberFormat
                        value={accountStore.liquid.toFixed(4)}
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                    </h2>
                    <div className="d-inline-block m-l-5 super ">
                      <p className="text-muted  m-b-0 f-w-400 " />
                      <p className="text-muted  m-b-0 f-w-400 ">/ EOS (Liquid)</p>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 ">
                  <div className="card-block-big ">
                    <h2 className="text-c-blue d-inline-block m-b-40 f-50 ">
                      <NumberFormat
                        value={unstaked.toFixed(4)}
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                    </h2>
                    <div className="d-inline-block m-l-5 super ">
                      <p className="text-muted  m-b-0 f-w-400 " />
                      <p className="text-muted  m-b-0 f-w-400 ">/ EOS (Unstaked)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ">
                <div className="col-sm-6 ">
                  <div className="card-block-big b-r-default">
                    <h2 className="text-c-blue d-inline-block m-b-40 f-50 ">
                      <NumberFormat
                        value={accountStore.cpu_staked.toFixed(4)}
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                    </h2>
                    <div className="d-inline-block m-l-5 super ">
                      <p className="text-muted  m-b-0 f-w-400 " />
                      <p className="text-muted  m-b-0 f-w-400 ">/ EOS (Cpu staked)</p>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 ">
                  <div className="card-block-big ">
                    <h2 className="text-c-blue d-inline-block m-b-40 f-50 ">
                      <NumberFormat
                        value={accountStore.net_staked.toFixed(4)}
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                    </h2>
                    <div className="d-inline-block m-l-5 super ">
                      <p className="text-muted  m-b-0 f-w-400 " />
                      <p className="text-muted  m-b-0 f-w-400 ">/ EOS (Net staked)</p>
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

export default MyResourceView
