import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'

@inject('eosioStore')
@observer
class BlockView extends Component {
  componentDidMount() {
    this.update()
    this.intervalId = setInterval(this.update, 1500)
  }

  componentDidUnmount = () => {
    clearInterval(this.intervalId)
  }

  update = async () => {
    const { eosioStore } = this.props
    eosioStore.getInfo()
    eosioStore.getGlobalInfo()
  }

  render() {
    const { eosioStore } = this.props

    return (
      <div className="row">
        {eosioStore &&
          eosioStore.eosInfo && (
            <div className="col-md-12">
              <div className="card card-statistics ">
                <div className="card-header ">
                  <div className="card-header-left ">
                    <h6>
                      <FormattedMessage id="Block Info" />
                    </h6>
                  </div>
                </div>
                <div className="card-block text-center">
                  <div className="row ">
                    <div className="col-sm-4 b-r-default">
                      <div className="row stats-block">
                        <div className="col-lg-12 ">
                          <h2 className="m-b-40 f-50 ">
                            <NumberFormat
                              value={eosioStore.eosInfo.last_irreversible_block_num}
                              displayType={'text'}
                              thousandSeparator={true}
                            />
                          </h2>

                          <p className="text-muted">
                            <FormattedMessage id="Irreversible Blocks" />
                            <i class="fa fa-caret-up m-l-10 text-c-green" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 b-r-default">
                      <div className="row stats-block">
                        <div className="col-lg-12 ">
                          <h2 className="m-b-40 f-50 ">
                            <NumberFormat
                              value={eosioStore.eosInfo.head_block_num}
                              displayType={'text'}
                              thousandSeparator={true}
                            />
                          </h2>
                          <p className="text-muted ">
                            <FormattedMessage id="Head Blocks" />
                            <i class="fa fa-caret-up m-l-10 text-c-green" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 ">
                      <div className="row stats-block">
                        <div className="col-lg-12 ">
                          <h2 className="m-b-40 f-50 ">{eosioStore.eosInfo.head_block_producer}</h2>
                          <p className="text-muted ">
                            <FormattedMessage id="Head Block Producer" />
                            <i class="fa fa-caret-up m-l-10 text-c-green" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BlockView
