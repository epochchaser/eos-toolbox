import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home, FindAccount } from './pages'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/findaccount" component={FindAccount} />
      </Switch>
    )
  }
}

export default Routes
