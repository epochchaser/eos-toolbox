import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Home,
  MyAccount,
  FindAccount,
  Voting,
  BlockExplorer,
  Delegate,
  Undelegate,
  RegVoteProxy,
  Refund
} from './pages'
import { inject, observer } from '../node_modules/mobx-react'

@inject('commonStore')
@observer
class Routes extends Component {
  render() {
    const { _initilizedEos } = this.props.commonStore

    return (
      <Switch>
        <Route exact path="/" component={Home} />
        {_initilizedEos && <Route exact path="/findaccount" component={FindAccount} />}
        <Route exact path="/account" component={MyAccount} />
        <Route exact path="/account/delegate" component={Delegate} />
        <Route exact path="/account/undelegate" component={Undelegate} />
        <Route exact path="/account/refund" component={Refund} />
        <Route exact path="/blockexplorers" component={BlockExplorer} />
        <Route exact path="/blockexplorers/:query" component={BlockExplorer} />
        <Route exact path="/voting/vote" component={Voting} />
        <Route exact path="/voting/proxy" component={RegVoteProxy} />
      </Switch>
    )
  }
}

export default Routes
