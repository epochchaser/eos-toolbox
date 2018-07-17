import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import BlockView from '../components/home/BlockView'
import MarketView from '../components/home/MarketView'
import StakingView from '../components/home/StakingView'
import BpListView from '../components/home/BpListView'
import NameBidListView from '../components/home/NameBidListView'

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
      <Fragment>
        <div className="page-wrapper">
          <div className="page-body">
            <BlockView />
            <MarketView />
            <StakingView />
            <div className="row">
              <BpListView />
              <NameBidListView />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Home
