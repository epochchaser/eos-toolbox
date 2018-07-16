import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'

@inject('eosioStore')
@observer
class NameAuctionListView extends Component {
  constructor(props) {
    super(props)
    const { eosioStore } = this.props
    this.eosioStore = eosioStore
  }

  render() {
    return (
      <div className="col-md-6">
        <div className="card ">
          <div className="card-header ">
            <div className="card-header-left ">
              <h5>
                <FormattedMessage id="Account Name Bids Top 30" />
              </h5>
            </div>
            <div className="card-header-right" style={{ display: 'none' }}>
              <ul className="list-unstyled card-option">
                <li>
                  <i className="icofont icofont-simple-left " />
                </li>
                <li>
                  <i className="icofont icofont-maximize full-card" />
                </li>
                <li>
                  <i className="icofont icofont-minus minimize-card" />
                </li>
                <li>
                  <i className="icofont icofont-refresh reload-card" />
                </li>
                <li>
                  <i className="icofont icofont-error close-card" />
                </li>
              </ul>
            </div>
          </div>
          <div className="card-block ">
            <div className="browser-card p-b-15 ">
              <p className="d-inline-block m-0 ">Google Crome</p>
              <label className="label bg-c-blue btn-round float-right btn-browser">50%</label>
            </div>
            <div className="browser-card b-t-default p-t-15 p-b-15 ">
              <p className="d-inline-block m-0 ">Mozila Firefox</p>
              <label className="label bg-c-pink btn-round float-right btn-browser">12%</label>
            </div>
            <div className="browser-card b-t-default p-t-15 p-b-15 ">
              <p className="d-inline-block m-0 ">Apple Safari</p>
              <label className="label bg-c-yellow btn-round float-right btn-browser">23%</label>
            </div>
            <div className="browser-card b-t-default p-t-15 p-b-15 ">
              <p className="d-inline-block m-0 ">Internet Explorer</p>
              <label className="label bg-c-green btn-round float-right btn-browser">17%</label>
            </div>
            <div className="browser-card b-t-default p-t-15 p-b-15 ">
              <p className="d-inline-block m-0 ">Opera Mini</p>
              <label className="label bg-c-yellow btn-round float-right btn-browser">07%</label>
            </div>
            <div className="browser-card b-t-default p-t-15">
              <p className="d-inline-block m-0 ">Microsoft Edge</p>
              <label className="label bg-c-yellow btn-round float-right btn-browser">28%</label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NameAuctionListView
