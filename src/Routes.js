import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home, MyAccount, FindAccount, Voting, BlockExplorer, Undelegate } from './pages'
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
        <Route exact path="/account/undelegate" component={Undelegate} />
        <Route exact path="/blockexplorer" component={BlockExplorer} />
        <Route exact path="/voting/dovoting" component={Voting} />
      </Switch>
    )
  }
}

export default Routes
