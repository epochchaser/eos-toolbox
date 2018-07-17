import React, { Component, Fragment } from 'react'
import MyResourceView from '../components/account/MyResourceView'
import UndelegateSimulationView from '../components/account/UndelegateSimulationView'
import { inject, observer } from '../../node_modules/mobx-react'

@inject('accountStore')
@observer
class Undelegate extends Component {
  render() {
    const { accountStore } = this.props

    return (
      accountStore &&
      accountStore.accountInfo && (
        <Fragment>
          <div className="page-wrapper">
            <div className="page-body">
              <MyResourceView />
              <UndelegateSimulationView />
              <div className="row" />
            </div>
          </div>
        </Fragment>
      )
    )
  }
}

export default Undelegate
