import React, { Component } from 'react'
import { Router, Route, Link, History, withRouter, Redirect } from 'react-router-dom'
import '../styles/layout/Nav.scss'
import { FormattedMessage } from 'react-intl'

class Nav extends Component {
  constructor(props) {
    super(props)
  }

  routeActive = paths => {
    paths = Array.isArray(paths) ? paths : [paths]
    if (paths.indexOf(this.props.location.pathname.replace('/', '')) > -1) return true
    return false
  }

  render() {
    return (
      <nav className="pcoded-navbar">
        <div className="pcoded-inner-navbar main-menu">
          <div className="pcoded-navigation-label">
            <FormattedMessage id="function" />
          </div>

          <ul className="pcoded-item pcoded-left-item">
            <li
              className={
                'pcoded-hasmenu' +
                (this.routeActive(['blockexplorer']) ? ' active pcoded-trigger' : '')
              }
            >
              <a>
                <span className="pcoded-micon">
                  <i className="ti-home" />
                  <b>D</b>
                </span>
                <span className="pcoded-mtext">
                  <FormattedMessage id="Block Explorer" />
                </span>
                <span className="pcoded-mcaret" />
              </a>
              <ul className="pcoded-submenu">
                <li className={this.routeActive('blockexplorer') ? ' active' : ''}>
                  <Link to="/blockexplorer">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Block Explorer" />
                    </span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="pcoded-item pcoded-left-item">
            <li
              className={
                'pcoded-hasmenu' +
                (this.routeActive(['account/create']) ? ' active pcoded-trigger' : '')
              }
            >
              <a>
                <span className="pcoded-micon">
                  <i className="ti-home" />
                  <b>D</b>
                </span>
                <span className="pcoded-mtext">
                  <FormattedMessage id="Account" />
                </span>
              </a>
              <span className="pcoded-mcaret" />
              <ul className="pcoded-submenu">
                <li className="">
                  <Link to="account/create">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Create Account" />
                    </span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
                <li className="">
                  <Link to="account/delegate">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Delegate" />
                    </span>
                    <span className="pcoded-badge label label-info ">Stake</span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
                <li className=" ">
                  <Link to="account/undelegate">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Undelegate" />
                    </span>
                    <span className="pcoded-badge label label-info ">Unstake</span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
                <li className=" ">
                  <Link to="account/rammarket">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Ram Market" />
                    </span>
                    <span className="pcoded-badge label label-info ">EOS</span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
                <li className=" ">
                  <Link to="account/refund">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Refund" />
                    </span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
                <li className=" ">
                  <Link to="account/permissions">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Permissions" />
                    </span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="pcoded-item pcoded-left-item">
            <li
              className={
                'pcoded-hasmenu' + (this.routeActive(['voting']) ? ' active pcoded-trigger' : '')
              }
            >
              <a>
                <span className="pcoded-micon">
                  <i className="ti-home" />
                  <b>D</b>
                </span>
                <span className="pcoded-mtext">
                  <FormattedMessage id="Voting" />
                </span>
                <span className="pcoded-mcaret" />
              </a>
              <ul className="pcoded-submenu">
                <li className={this.routeActive('voting') ? ' active' : ''}>
                  <Link to="/voting/dovoting">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Do Voting" />
                    </span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Nav)
