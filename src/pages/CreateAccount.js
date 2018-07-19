import React, { Component, Fragment } from 'react'
import CreateAccountView from '../components/account/CreateAccountView'
import { inject, observer } from '../../node_modules/mobx-react'

@inject('accountStore')
@observer
class CreateAccount extends Component {
  render() {
    const { accountStore } = this.props

    return (
      accountStore &&
      accountStore.accountInfo && (
        <Fragment>
          <div className="page-wrapper">
            <div className="page-body">
              <div className="row">
                <CreateAccountView />
              </div>
            </div>
          </div>
        </Fragment>
      )
    )
  }
}

export default CreateAccount
