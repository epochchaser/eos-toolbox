import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'

@inject('eosioStore', 'commonStore')
@observer
class MarketView extends Component {
  constructor(props) {
    super(props)
    let { eosioStore, commonStore } = this.props
    this.eosioStore = eosioStore
    this.commonStore = commonStore
  }

  componentDidMount = async () => {
    await this.commonStore.getCoinMarketCap()
    await this.eosioStore.getGlobalInfo()
    await this.eosioStore.getCurrencyStats()
    this.update()

    this.intervalId = setInterval(this.update, 1500)
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalId)
  }

  update = async () => {
    await this.eosioStore.getRamMarkets()
  }

  render() {
    const percent = this.eosioStore.ramInfo
      ? `${this.eosioStore.ramInfo.reservedRamPercent.toFixed(0)}%`
      : '0%'
    const reservedRamChartStyle = {
      width: percent
    }
    return (
      <div>
        {this.eosioStore.ramInfo &&
          this.eosioStore.currencyStats &&
          this.commonStore.coinMarketCap && (
            <div className="row">
              <div className="col-md-12 col-xl-6">
                <div className="card task-sale-card ">
                  <div className="card-header ">
                    <div className="card-header-left ">
                      <h5>
                        <FormattedMessage id="Market Cap (USD)" />
                      </h5>
                    </div>
                  </div>
                  <div className="card-block-big ">
                    <h2 className="text-c-green d-inline-block m-b-40 f-40 ">
                      <NumberFormat
                        value={this.commonStore.coinMarketCap.data.quotes.USD.price.toFixed(4)}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                      />
                    </h2>
                    <div className="d-inline-block m-l-5 super ">
                      <p className="text-muted  m-b-0 f-w-400 " />
                      <p className="text-muted  m-b-0 f-w-400 ">/ EOS</p>
                    </div>
                    <div className="row ">
                      <div className="col-sm-6 ">
                        <h3 className="text-muted d-inline-block">
                          <NumberFormat
                            value={this.commonStore.coinMarketCap.data.quotes.USD.market_cap.toFixed(
                              0
                            )}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'$'}
                          />
                        </h3>
                        <div className="d-inline-block m-l-5">
                          <p className=" m-b-0 f-w-400 f-12 text-uppercase">
                            <FormattedMessage id="Market Cap" />
                          </p>
                        </div>
                      </div>
                      <div className="col-sm-6 ">
                        <h3 className="text-muted d-inline-block">
                          <NumberFormat
                            value={this.commonStore.coinMarketCap.data.quotes.USD.volume_24h.toFixed(
                              0
                            )}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'$'}
                          />
                        </h3>
                        <div className="d-inline-block m-l-5">
                          <p className=" m-b-0 f-w-400 f-12 text-uppercase">
                            <FormattedMessage id="24h Volume" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="b-t-default p-t-20 m-t-5">
                      <div className="row text-center p-t-15 p-b-15">
                        <div className="col-sm-6 f-prog">
                          <p className="f-16 m-0 f-w-400">
                            <FormattedMessage id="Circulating Supply" />
                          </p>
                          <span className="text-muted">
                            <NumberFormat
                              value={Number(
                                this.eosioStore.currencyStats.EOS.supply.replace('EOS', '')
                              ).toFixed(0)}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={' EOS'}
                            />
                          </span>
                        </div>
                        <div className="col-sm-6">
                          <p className="f-16 m-0 f-w-400">
                            <FormattedMessage id="Max Supply" />
                          </p>
                          <span className="text-muted">
                            <NumberFormat
                              value={Number(
                                this.eosioStore.currencyStats.EOS.max_supply.replace('EOS', '')
                              ).toFixed(0)}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={' EOS'}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-xl-6">
                <div className="card task-sale-card ">
                  <div className="card-header ">
                    <div className="card-header-left ">
                      <h5>
                        <FormattedMessage id="RAM Market" />
                      </h5>
                    </div>
                  </div>
                  <div className="card-block-big ">
                    <h2 className="text-c-green d-inline-block m-b-40 f-40 ">
                      <NumberFormat
                        value={this.eosioStore.ramInfo.kbPrice.toFixed(8)}
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                    </h2>
                    <div className="d-inline-block m-l-5 super ">
                      <p className="text-muted  m-b-0 f-w-400 " />
                      <p className="text-muted  m-b-0 f-w-400 ">EOS/KB</p>
                    </div>
                    <div className="row ">
                      <div className="col-sm-6 ">
                        <h3 className="text-muted d-inline-block">
                          <NumberFormat
                            value={this.eosioStore.ramInfo.freeRamGb.toFixed(2)}
                            displayType={'text'}
                            thousandSeparator={true}
                          />
                        </h3>
                        <div className="d-inline-block m-l-5">
                          <p className=" m-b-0 f-w-400 f-12 text-uppercase">
                            <FormattedMessage id="GB Free" />
                          </p>
                        </div>
                      </div>
                      <div className="col-sm-6 ">
                        <h3 className="text-muted d-inline-block">
                          <NumberFormat
                            value={this.eosioStore.ramInfo.eos.toFixed(0)}
                            displayType={'text'}
                            thousandSeparator={true}
                          />
                        </h3>
                        <div className="d-inline-block m-l-5">
                          <p className=" m-b-0 f-w-400 f-12 text-uppercase">EOS</p>
                        </div>
                      </div>
                    </div>
                    <div className="b-t-default p-t-20 m-t-5">
                      <div className="row text-center p-t-15 p-b-15">
                        <div className="col-sm-12 f-prog">
                          <div className="row">
                            <div
                              className="col-sm-6 f-16 m-0 f-w-400 text-left"
                              style={{ width: '50%' }}
                            >
                              <NumberFormat
                                value={this.eosioStore.ramInfo.reservedRamGb.toFixed(2)}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'GB'}
                              />{' '}
                              (<NumberFormat
                                value={this.eosioStore.ramInfo.reservedRamPercent.toFixed(2)}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'%'}
                              />)
                            </div>
                            <div
                              className="col-sm-6 f-16 m-0 f-w-400 text-right"
                              style={{ width: '50%' }}
                            >
                              <NumberFormat
                                value={this.eosioStore.ramInfo.totalRamGb.toFixed(2)}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'GB'}
                              />
                            </div>
                          </div>
                          <div className="progress m-t-5">
                            <div
                              className="progress-bar bg-c-green"
                              role="progressbar"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={reservedRamChartStyle}
                            />
                          </div>
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

export default MarketView
