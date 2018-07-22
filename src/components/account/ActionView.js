import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import TokenView from './TokenView'
import NumberFormat from 'react-number-format'
import UsageResourceView from '../UsageResourceView'

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
  }

  render() {
    let tokens = this.explorerStore.tokens

    return (
      <Fragment>
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-body">
              <div className="row">
                <TokenView tokens={tokens} />
              </div>
              <div className="row" />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default ActionView
