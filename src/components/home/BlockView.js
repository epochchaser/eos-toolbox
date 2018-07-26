import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'

@inject('eosioStore')
@observer
class BlockView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      irreversible_block_offset: 0,
      head_block_offset: 0
    }
  }

  componentDidMount() {
    this.update()
    this.intervalId = setInterval(this.update, 1500)
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalId)
  }

  update = async () => {
    const { eosioStore } = this.props
    eosioStore.getInfo()
    eosioStore.getGlobalInfo()

    if (eosioStore.eosInfo) {
      this.setState({
        irreversible_block_offset: Number(eosioStore.eosInfo.last_irreversible_block_num),
        head_block_offset: Number(eosioStore.eosInfo.head_block_num)
      })
    }
  }

  render() {
    const { eosioStore } = this.props
    const { irreversible_block_offset, head_block_offset } = this.state

    let irresOffset = 0
    let headOffset = 0

    if (eosioStore.eosInfo) {
      irresOffset = eosioStore.eosInfo.last_irreversible_block_num - irreversible_block_offset
      headOffset = eosioStore.eosInfo.head_block_num - head_block_offset
    }

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
                            <i className="fa fa-caret-up m-l-10 m-r-10 text-c-green" />
                            {irresOffset}
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
                            <i className="fa fa-caret-up m-l-10 m-r-10 text-c-green" />
                            {headOffset}
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
                            <i className="fa fa-caret-up m-l-10 text-c-green" />
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
