import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'

class UsageResourceView extends Component {
  render() {
    let width = this.props.resource.usageRate

    if (this.props.resource.usageRate > 0 && this.props.resource.usageRate < 1) {
      width = 1
    } else if (this.props.resource.usageRate > 99 && this.props.resource.usageRate < 100) width = 99

    const availableChartStyle = {
      width: `${width.toFixed(0)}%`
    }

    return (
      this.props.resource && (
        <div className="row">
          <div className="col-md-12">
            <div className="card statustic-card">
              <div className="card-header">
                <h5>
                  <FormattedMessage id={this.props.resource.title} />
                </h5>
              </div>
              <div className="card-block text-center">
                <span className={'d-block f-36 text-c-' + this.props.resource.color}>
                  <NumberFormat
                    value={this.props.resource.available.toFixed(this.props.resource.fixed)}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={this.props.resource.unit}
                  />
                </span>
                <div className="progress">
                  <div
                    className={'progress-bar bg-c-' + this.props.resource.color}
                    style={availableChartStyle}
                  />
                </div>
              </div>
              <div className={'card-footer bg-c-' + this.props.resource.color}>
                <h6 className="text-white m-b-0">
                  <FormattedMessage id="Usaged" />{' '}
                  <NumberFormat
                    value={this.props.resource.used.toFixed(this.props.resource.fixed)}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={this.props.resource.unit}
                  />{' '}
                  /{' '}
                  <NumberFormat
                    value={this.props.resource.max.toFixed(this.props.resource.fixed)}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={this.props.resource.unit}
                  />{' '}
                  ({`${this.props.resource.usageRate.toFixed(2)}%`})
                </h6>
              </div>
            </div>
          </div>
        </div>
      )
    )
  }
}

export default UsageResourceView
