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
      <div class="col-sm-12 search2 search-result">
        <div class="card card-main">
          <div class="card-block">
            <div class="row">
              <div class="col-sm-12">
                <div class="search-content">
                  <div class="card-block m-t-40 col-sm-12">
                    <p class="card-text text-muted text-center">
                      <FormattedMessage id="No Seasrch Results" />
                    </p>
                    <div className="preloader3 loader-block m-t-40">
                      <div className="circ1" />
                      <div className="circ2" />
                      <div className="circ3" />
                      <div className="circ4" />
                    </div>
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
