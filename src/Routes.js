import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home, FindAccount, Voting } from './pages'
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
        <Route exact path="/voting" component={Voting} />
      </Switch>
    )
  }
}

export default Routes
