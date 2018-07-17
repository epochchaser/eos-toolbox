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
                (this.routeActive(['blockexplorers']) ? ' active pcoded-trigger' : '')
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
                <li className={this.routeActive('blockexplorers') ? ' active' : ''}>
                  <Link to="/blockexplorers">
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
                (this.routeActive([
                  'accounts/create',
                  'accounts/delegate',
                  'accounts/undelegate',
                  'accounts/rammarket',
                  'accounts/refund',
                  'accounts/permission'
                ])
                  ? ' active pcoded-trigger'
                  : '')
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
                <li className={this.routeActive('accounts/create') ? ' active' : ''}>
                  <Link to="/accounts/create">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Create Account" />
                    </span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
                <li className={this.routeActive('accounts/delegate') ? ' active' : ''}>
                  <Link to="/accounts/delegate">
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
                <li className={this.routeActive('accounts/undelegate') ? ' active' : ''}>
                  <Link to="/accounts/undelegate">
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
                <li className={this.routeActive('accounts/rammarket') ? ' active' : ''}>
                  <Link to="/accounts/rammarket">
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
                <li className={this.routeActive('accounts/refund') ? ' active' : ''}>
                  <Link to="/accounts/refund">
                    <span className="pcoded-micon">
                      <i className="ti-angle-right" />
                    </span>
                    <span className="pcoded-mtext">
                      <FormattedMessage id="Refund" />
                    </span>
                    <span className="pcoded-mcaret" />
                  </Link>
                </li>
                <li className={this.routeActive('accounts/permission') ? ' active' : ''}>
                  <Link to="/accounts/permission">
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
