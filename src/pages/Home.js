import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import BlockView from '../components/BlockView'
import MarketView from '../components/MarketView'

@inject('accountStore', 'eosioStore')
@observer
class Home extends Component {
  constructor(props) {
    super(props)
    let { accountStore, eosioStore } = this.props
    this.accountStore = accountStore
    this.eosioStore = eosioStore
  }

  render() {
    return (
      <div>
        <Fragment>
          <div className="page-wrapper">
            <div className="page-body">
              <BlockView />
              <MarketView />
            </div>
          </div>
        </Fragment>
      </div>
    )
  }
}

export default Home
