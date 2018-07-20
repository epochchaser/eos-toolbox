import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Home,
  MyAccount,
  CreateAccount,
  Voting,
  BlockExplorer,
  Delegate,
  Undelegate,
  RegVoteProxy,
  Refund,
  Constitution
} from './pages'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/account/my" component={MyAccount} />
        <Route exact path="/account/create" component={CreateAccount} />
        <Route exact path="/account/delegate" component={Delegate} />
        <Route exact path="/account/undelegate" component={Undelegate} />
        <Route exact path="/account/refund" component={Refund} />
        <Route exact path="/blockexplorers" component={BlockExplorer} />
        <Route exact path="/blockexplorers/:query" component={BlockExplorer} />
        <Route exact path="/voting/vote" component={Voting} />
        <Route exact path="/voting/proxy" component={RegVoteProxy} />
        <Route exact path="/constitution/provision" component={Constitution} />
      </Switch>
    )
  }
}

export default Routes
