import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import BlockView from '../components/home/BlockView'
import MarketView from '../components/home/MarketView'
import StakingView from '../components/home/StakingView'
import BpListView from '../components/home/BpListView'
import NameAuctionListView from '../components/home/NameAuctionListView'

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
              <StakingView />
              <div className="row">
                <BpListView />
                <NameAuctionListView />
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    )
  }
}

export default Home
