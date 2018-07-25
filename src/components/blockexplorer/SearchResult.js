import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'
import AccountView from './AccountView'
import AccountListView from './AccountListView'
import TransactionView from './TransactionView'
import BlockView from './BlockView'

@inject('explorerStore')
@observer
class SearchResult extends Component {
  render() {
    const { explorerStore } = this.props

    return (
      <Fragment>
        {explorerStore &&
          (explorerStore.isLoading ||
            (!explorerStore.isLoading &&
              !explorerStore.account &&
              !explorerStore.accounts &&
              !explorerStore.transaction &&
              !explorerStore.block)) && (
            <div className="col-sm-12 search2 search-result">
              <div className="card card-main">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="search-content">
                        <div className="card-block m-t-40 col-sm-12">
                          {!explorerStore.isLoading &&
                            (!explorerStore.account &&
                              !explorerStore.accounts &&
                              !explorerStore.transaction &&
                              !explorerStore.block) && (
                              <p className="card-text text-muted text-center">
                                <FormattedMessage id="No Seasrch Results" />
                              </p>
                            )}
                          {explorerStore.isLoading && (
                            <div
                              className="preloader3 loader-block m-t-20"
                              style={{ height: '9px' }}
                            >
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
          )}
        {!explorerStore.isLoading && explorerStore.account && <AccountView />}
        {!explorerStore.isLoading && explorerStore.transaction && <TransactionView />}
        {!explorerStore.isLoading && explorerStore.accounts && <AccountListView />}
        {!explorerStore.isLoading && explorerStore.block && <BlockView />}
      </Fragment>
    )
  }
}

export default SearchResult
