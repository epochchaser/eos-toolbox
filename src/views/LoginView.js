import React, { Component, Fragment } from "react"
import { observer, inject } from "mobx-react"

@inject("accountStore")
@observer
class LoginView extends Component {
  render() {
    const { accountStore } = this.props

    console.log(`accStore : ${accountStore}`)

    return (
      <Fragment>
        <a href="#!">
          <span>Login</span>
          <i className="ti-angle-down" />
        </a>
        <ul className="show-notification profile-notification">
          <li>
            <a href="#!">
              <i className="ti-settings" /> Settings
            </a>
          </li>
          <li>
            <a href="user-profile.html">
              <i className="ti-user" /> Profile
            </a>
          </li>
          <li>
            <a href="email-inbox.html">
              <i className="ti-email" /> My Messages
            </a>
          </li>
          <li>
            <a href="auth-lock-screen.html">
              <i className="ti-lock" /> Lock Screen
            </a>
          </li>
          <li>
            <a href="auth-normal-sign-in.html">
              <i className="ti-layout-sidebar-left" /> Logout
            </a>
          </li>
          <button onClick={() => accountStore.login()}>눌러봐 임마</button>
        </ul>
      </Fragment>
    )
  }
}

export default LoginView
