import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home, FindAccount, Voting } from './pages'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/findaccount" component={FindAccount} />
        <Route exact path="/voting" component={Voting} />
      </Switch>
    )
  }
}

export default Routes
