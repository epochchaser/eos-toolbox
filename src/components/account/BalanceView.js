import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'

class BalanceView extends Component {
  render() {
    return (
      <div className="col-md-6 col-xl-4">
        <div className={'card order-card ' + this.props.balance.color}>
          <div className="card-block">
            <h6 className="m-b-20">
              <FormattedMessage id={this.props.balance.title} />
            </h6>
            <h2 className="text-right">
              <i className={this.props.balance.icon + ' f-left'} />
              <span>
                <NumberFormat
                  value={this.props.balance.balance}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={this.props.balance.unit}
                />
              </span>
            </h2>
            <p className="m-b-0">
              <FormattedMessage id={this.props.balance.subTitle} />
              <span className="f-right">
                <NumberFormat
                  value={this.props.balance.total}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={this.props.balance.totalUnit}
                />
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default BalanceView
