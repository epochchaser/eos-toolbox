import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'

@inject('explorerStore')
@observer
class SearchResult extends Component {
  constructor(props) {
    super(props)
    let { explorerStore } = this.props
    this.explorerStore = explorerStore
  }

  render() {
    return (
      <div className="col-sm-12 search2 search-result">
        <div className="card card-main">
          <div className="card-block">
            <div className="row">
              <div className="col-sm-12">
                <div className="search-content">
                  <div className="card-block m-t-40 col-sm-12">
                    {!this.explorerStore.isLoading && (
                      <p className="card-text text-muted text-center">
                        <FormattedMessage id="No Seasrch Results" />
                      </p>
                    )}
                    {this.explorerStore.isLoading && (
                      <div className="preloader3 loader-block m-t-20" style={{ height: '9px' }}>
                        <div className="circ1" />
                        <div className="circ2" />
                        <div className="circ3" />
                        <div className="circ4" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchResult
