import React, { Component, Fragment } from 'react'
import CreateAccountView from '../components/account/CreateAccountView'
import NeedLoginView from '../components/NeedLoginView'
import { inject, observer } from '../../node_modules/mobx-react'

@inject('accountStore', 'commonStore')
@observer
class CreateAccount extends Component {
  constructor(props) {
    super(props)
    const { commonStore, accountStore } = this.props
    this.commonStore = commonStore
    this.accountStore = accountStore
  }

  render() {
    return (
      <div>
        {this.accountStore &&
          this.accountStore.accountInfo && (
            <Fragment>
              <div className="page-wrapper">
                <div className="page-body">
                  <div className="row">
                    <CreateAccountView />
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        {!this.commonStore.isLoading && !this.accountStore.isLogin && <NeedLoginView />}
      </div>
    )
  }
}

export default CreateAccount
