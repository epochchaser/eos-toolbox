import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Home,
  MyAccount,
  CreateAccount,
  Voting,
  BlockExplorer,
  Staking,
  RegVoteProxy,
  Refund,
  Constitution,
  RamMarket,
  Transfer,
  CreateKey,
  Donation
} from './pages'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/account/my" component={MyAccount} />
        <Route exact path="/account/create" component={CreateAccount} />
        <Route exact path="/account/staking" component={Staking} />
        <Route exact path="/account/refund" component={Refund} />
        <Route exact path="/account/rammarket" component={RamMarket} />
        <Route exact path="/account/transfer" component={Transfer} />
        <Route exact path="/keys/create" component={CreateKey} />
        <Route exact path="/blockexplorers" component={BlockExplorer} />
        <Route exact path="/blockexplorers/:query" component={BlockExplorer} />
        <Route exact path="/voting/vote" component={Voting} />
        <Route exact path="/voting/proxy" component={RegVoteProxy} />
        <Route exact path="/constitution/provision" component={Constitution} />
        <Route exact path="/donation" component={Donation} />
      </Switch>
    )
  }
}

export default Routes
