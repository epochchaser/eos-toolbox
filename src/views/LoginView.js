import React, { Component, Fragment } from "react"
import { observer } from "mobx-react"

@observer
class LoginView extends Component {
  render() {
    const { datacontext } = this.props

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
          <button onClick={() => datacontext.login()}>눌러봐 임마</button>
        </ul>
      </Fragment>
    )
  }
}

export default LoginView
