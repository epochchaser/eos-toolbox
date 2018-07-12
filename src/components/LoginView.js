import React, { Component, Fragment } from "react"
import { inject, observer } from "mobx-react";

@inject('accountStore')
@observer
class LoginView extends Component {
  
  constructor(props) {
    super(props);
    let { accountStore } = this.props;
    this.accountStore = accountStore;
  }

  loginClick = () => {
    this.accountStore.login();
  }

  logoutClick = () => {
    this.accountStore.logout();
  }

  render() {
    console.log(`accStore : ${this.accountStore}`)

    return (
      <Fragment>
        <a href="#!">
          {
            !this.accountStore.isLogin &&
            <span>Login</span>
          }
          {
            this.accountStore.isLogin &&
            <span>{this.accountStore.account.name}@{this.accountStore.account.authority}</span>
          }

          <i className="ti-angle-down" />
        </a>
        <ul className="show-notification profile-notification">
          {
              !this.accountStore.isLogin &&
            <li>
              <a href="#!" onClick={this.loginClick}>
                <i className="ti-settings" /> Login
              </a>
            </li>
          }
          {
              this.accountStore.isLogin &&
              <div>
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
                  <a href="#!" onClick={this.logoutClick}>
                    <i className="ti-layout-sidebar-left" /> Logout
                  </a>
                </li>
              </div>
          }
        </ul>
      </Fragment>
    )
  }
}

export default LoginView
