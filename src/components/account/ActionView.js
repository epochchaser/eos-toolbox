import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'
import TokenView from './TokenView'
import AccountDetailView from '../blockexplorer/AccountDetailView'

@inject('accountStore', 'explorerStore')
@observer
class ActionView extends Component {
  constructor(props) {
    super(props)
    let { accountStore, explorerStore } = this.props
    this.accountStore = accountStore
    this.explorerStore = explorerStore
  }

  componentDidMount = async () => {
    await this.explorerStore.getActions(this.accountStore.accountInfo.account_name)
    await this.explorerStore.getAccountTokens(this.accountStore.accountInfo.account_name)
    await this.explorerStore.getTransferHistory(this.accountStore.accountInfo.account_name)
    await this.explorerStore.getVotingHistory(this.accountStore.accountInfo.account_name)
    await this.explorerStore.getNewAccountHistory(this.accountStore.accountInfo.account_name)
  }

  render() {
    let tokens = this.explorerStore.tokens
    const permissions = this.accountStore.permissions ? this.accountStore.permissions : []
    return (
      <Fragment>
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-body">
              <div className="row m-l-5 m-r-5">
                <div className="col-sm-12 p-0">
                  <TokenView tokens={tokens} />
                </div>
              </div>
              <div className="row m-l-10 m-b-20">
                <div className="col-sm-12">
                  <h5>
                    <FormattedMessage id="Actions" />
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="card tabs-card">
                    <div className="card-block p-0">
                      <AccountDetailView
                        transfers={this.explorerStore.transferHistory}
                        permissions={permissions}
                        newaccounts={this.explorerStore.newAccountHistory}
                        votings={''}
                      />
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

export default ActionView
