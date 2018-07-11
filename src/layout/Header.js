import React from "react"
import "../styles/Header.scss"

const Header = props => {
  return (
    <nav className="navbar header-navbar pcoded-header">
      <div className="navbar-wrapper">
        <div className="navbar-logo">
            <a className="mobile-menu" id="mobile-collapse" href="#!">
                <i className="ti-menu"></i>
            </a>
            <h5>EOS TOOLBOX</h5>
        </div>

        <div className="navbar-container container-fluid">
            <ul className="nav-left">
                <li>
                    <div className="sidebar_toggle"><a href="javascript:void(0)"><i className="ti-menu"></i></a></div>
                </li>
            </ul>
            <ul className="nav-right">
                <li className="header-notification">
                    <a href="#!">
                        <i className="ti-bell"></i>
                        <span className="badge bg-c-pink"></span>
                    </a>
                    <ul className="show-notification">
                        <li>
                            <h6>Notifications</h6>
                            <label className="label label-danger">New</label>
                        </li>
                        <li>
                            <div className="media">
                                <img className="d-flex align-self-center img-radius" src="../files/assets/images/avatar-2.jpg" alt="Generic placeholder image"/>
                                <div className="media-body">
                                    <h5 className="notification-user">John Doe</h5>
                                    <p className="notification-msg">Lorem ipsum dolor sit amet, consectetuer elit.</p>
                                    <span className="notification-time">30 minutes ago</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="media">
                                <img className="d-flex align-self-center img-radius" src="../files/assets/images/avatar-4.jpg" alt="Generic placeholder image"/>
                                <div className="media-body">
                                    <h5 className="notification-user">Joseph William</h5>
                                    <p className="notification-msg">Lorem ipsum dolor sit amet, consectetuer elit.</p>
                                    <span className="notification-time">30 minutes ago</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="media">
                                <img className="d-flex align-self-center img-radius" src="../files/assets/images/avatar-3.jpg" alt="Generic placeholder image"/>
                                <div className="media-body">
                                    <h5 className="notification-user">Sara Soudein</h5>
                                    <p className="notification-msg">Lorem ipsum dolor sit amet, consectetuer elit.</p>
                                    <span className="notification-time">30 minutes ago</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li className="">
                    <a href="#!" className="displayChatbox">
                        <i className="ti-comments"></i>
                        <span className="badge bg-c-green"></span>
                    </a>
                </li>
                <li className="user-profile header-notification">
                    <a href="#!">
                        <img src="../files/assets/images/avatar-4.jpg" className="img-radius" alt="User-Profile-Image"/>
                        <span>John Doe</span>
                        <i className="ti-angle-down"></i>
                    </a>
                    <ul className="show-notification profile-notification">
                        <li>
                            <a href="#!">
                                <i className="ti-settings"></i> Settings
                            </a>
                        </li>
                        <li>
                            <a href="user-profile.html">
                                <i className="ti-user"></i> Profile
                            </a>
                        </li>
                        <li>
                            <a href="email-inbox.html">
                                <i className="ti-email"></i> My Messages
                            </a>
                        </li>
                        <li>
                            <a href="auth-lock-screen.html">
                                <i className="ti-lock"></i> Lock Screen
                            </a>
                        </li>
                        <li>
                            <a href="auth-normal-sign-in.html">
                            <i className="ti-layout-sidebar-left"></i> Logout
                        </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    </nav>
  )
}

export default Header
