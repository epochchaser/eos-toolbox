import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'

@inject('eosioStore')
@observer
class BlockView extends Component {
  constructor(props) {
    super(props)
    let { eosioStore } = this.props
    this.eosioStore = eosioStore
  }

  componentDidMount() {
    this.eosioStore.getInfo()
    this.eosioStore.getGlobalInfo()
  }

  render() {
    return (
      <div>
        {this.eosioStore.eosInfo && (
          <div className="row">
            <div className="col-sm-4">
              <div className="card bg-c-pink text-white widget-visitor-card">
                <div className="card-block-small text-center">
                  <h2>
                    <NumberFormat
                      value={this.eosioStore.eosInfo.last_irreversible_block_num}
                      displayType={'text'}
                      thousandSeparator={true}
                    />
                  </h2>
                  <h6>
                    <FormattedMessage id="Irreversible Blocks" />
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card bg-c-blue text-white widget-visitor-card">
                <div className="card-block-small text-center">
                  <h2>
                    <NumberFormat
                      value={this.eosioStore.eosInfo.head_block_num}
                      displayType={'text'}
                      thousandSeparator={true}
                    />
                  </h2>
                  <h6>
                    <FormattedMessage id="Head Blocks" />
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card bg-c-yellow text-white widget-visitor-card">
                <div className="card-block-small text-center">
                  <h2>{this.eosioStore.eosInfo.head_block_producer}</h2>
                  <h6>
                    <FormattedMessage id="Head Block Producer" />
                  </h6>
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
