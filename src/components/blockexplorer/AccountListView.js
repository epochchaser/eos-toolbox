import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

@inject('explorerStore')
@observer
class AccountListView extends Component {
  constructor(props) {
    super(props)
    let { explorerStore } = this.props
    this.explorerStore = explorerStore
  }

  render() {
    return (
      <Fragment>
        {this.explorerStore.accounts.account_names.map((account, index) => (
          <div className="col-md-4 col-sm-6" key={index}>
            <Link to={'/blockexplorers/' + account}>
              <div className="card user-card">
                <div className="card-header">
                  <h5>
                    <FormattedMessage id="Account" />
                  </h5>
                </div>
                <div className="card-block">
                  <h4>{account}</h4>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Fragment>
    )
  }
}

export default AccountListView
