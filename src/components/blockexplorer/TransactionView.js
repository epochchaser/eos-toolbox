import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'

@inject('explorerStore')
@observer
class TransactionView extends Component {
  constructor(props) {
    super(props)
    let { explorerStore } = this.props
    this.explorerStore = explorerStore
  }

  render() {
    return (
      <Fragment>
        <div class="col-sm-12">
          <div class="card">
            <div class="card-header">
              <div class="card-header-left">
                <h5>Revenue report</h5>
              </div>
              <div class="card-header-right">
                <ul class="list-unstyled card-option">
                  <li>
                    <i class="icofont icofont-simple-left " />
                  </li>
                  <li>
                    <i class="icofont icofont-maximize full-card" />
                  </li>
                  <li>
                    <i class="icofont icofont-minus minimize-card" />
                  </li>
                  <li>
                    <i class="icofont icofont-refresh reload-card" />
                  </li>
                  <li>
                    <i class="icofont icofont-error close-card" />
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-block p-0">
              <div class="card-block-big revenue-report">
                <div class="row">
                  <div class="col-lg-3">
                    <h3 class="f-w-400">$5,763</h3>
                  </div>
                  <div class="col-lg-3">
                    <canvas id="revenue-report" height="150" />
                  </div>
                  <div class="col-lg-4">
                    <div class="revenue-card p-b-10">
                      <span class="bg-c-blue" />
                      <h6 class="text-muted d-inline-block m-l-20">This month</h6>
                      <h6 class="d-inline-block m-l-20 f-w-600">$57,423</h6>
                    </div>
                    <div class="revenue-card b-t-default  p-t-10">
                      <span class="bg-c-green m-t-10" />
                      <h6 class="text-muted d-inline-block m-l-20">This month</h6>
                      <h6 class="d-inline-block m-l-20 f-w-600">$48,689</h6>
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

export default TransactionView
