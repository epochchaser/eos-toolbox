import React, { Component } from "react"
import "../styles/layout/Header.scss"
import LoginView from "../components/LoginView"

class Header extends Component {
  render() {
    return (
      <nav className="navbar header-navbar pcoded-header">
        <div className="navbar-wrapper">
          <div className="navbar-logo">
            <a className="mobile-menu" id="mobile-collapse" href="#!">
              <i className="ti-menu" />
            </a>
            <header>
              <h5>EOS TOOLBOX</h5>
            </header>
          </div>

          <div className="navbar-container container-fluid">
            <ul className="nav-left">
              <li>
                <div className="sidebar_toggle">
                  <a href="javascript:void(0)">
                    <i className="ti-menu" />
                  </a>
                </div>
              </li>
            </ul>
            <ul className="nav-right">
              <li className="header-notification">
                <a href="#!">
                  <i className="ti-bell" />
                  <span className="badge bg-c-pink" />
                </a>
                <ul className="show-notification">
                  <li>
                    <h6>Notifications</h6>
                    <label className="label label-danger">New</label>
                  </li>
                  <li>
                    <div className="media">
                      <img
                        className="d-flex align-self-center img-radius"
                        src="../files/assets/images/avatar-2.jpg"
                        alt="Generic placeholder image"
                      />
                      <div className="media-body">
                        <h5 className="notification-user">John Doe</h5>
                        <p className="notification-msg">
                          Lorem ipsum dolor sit amet, consectetuer elit.
                        </p>
                        <span className="notification-time">30 minutes ago</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="media">
                      <img
                        className="d-flex align-self-center img-radius"
                        src="../files/assets/images/avatar-4.jpg"
                        alt="Generic placeholder image"
                      />
                      <div className="media-body">
                        <h5 className="notification-user">Joseph William</h5>
                        <p className="notification-msg">
                          Lorem ipsum dolor sit amet, consectetuer elit.
                        </p>
                        <span className="notification-time">30 minutes ago</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="media">
                      <img
                        className="d-flex align-self-center img-radius"
                        src="../files/assets/images/avatar-3.jpg"
                        alt="Generic placeholder image"
                      />
                      <div className="media-body">
                        <h5 className="notification-user">Sara Soudein</h5>
                        <p className="notification-msg">
                          Lorem ipsum dolor sit amet, consectetuer elit.
                        </p>
                        <span className="notification-time">30 minutes ago</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="">
                <a href="#!" className="displayChatbox">
                  <i className="ti-comments" />
                  <span className="badge bg-c-green" />
                </a>
              </li>
              <li className="user-profile header-notification">
                <LoginView />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header
