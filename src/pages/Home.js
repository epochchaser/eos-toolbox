import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import BlockView from '../components/BlockView'
import MarketCapView from '../components/MarketCapView'
import RamMarketView from '../components/RamMarketView'

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
              <RamMarketView />
            </div>
          </div>
        </Fragment>
      </div>
    )
  }
}

export default Home
