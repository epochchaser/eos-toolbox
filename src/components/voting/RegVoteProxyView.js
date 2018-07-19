import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'

@inject('explorerStore')
@observer
class RegVoteProxyView extends Component {
  render() {
    return (
      <div className="col-sm-12">
        <div className="card">
          <div className="card-block">
            <div className="row">
              <div className="col-lg-6 offset-lg-3 m-t-10">
                <h5 className="txt-highlight text-center">
                  <FormattedMessage id="EOS Block Explorer" />
                </h5>
                <p className="text-muted text-center m-t-20">
                  <FormattedMessage id="Search with account, public key, transaction id, block number" />
                </p>
              </div>
            </div>
            <div className="row seacrh-header">
              <div className="col-lg-6 offset-lg-3 offset-sm-2 col-sm-8 offset-sm-1 col-xs-12">
                <div className="input-group input-group-button input-group-primary">
                  <input type="text" className="form-control" placeholder="Search here..." />
                  <button className="btn btn-primary input-group-addon" id="block-search">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RegVoteProxyView
