import React from 'react'
import '../styles/layout/Nav.scss'
import { FormattedMessage } from 'react-intl'

const Nav = props => {
  return (
    <nav className="pcoded-navbar">
      <div className="pcoded-inner-navbar main-menu">
        <div className="pcoded-navigation-label">
          <FormattedMessage id="function" />
        </div>
        <ul className="pcoded-item pcoded-left-item">
          <li className="pcoded-hasmenu active pcoded-trigger">
            <a href=" ">
              <span className="pcoded-micon">
                <i className="ti-home" />
                <b>D</b>
              </span>
              <span className="pcoded-mtext">
                <FormattedMessage id="Account" />
              </span>
              <span className="pcoded-mcaret" />
            </a>
            <ul className="pcoded-submenu">
              <li className="active">
                <a href="/findaccount">
                  <span className="pcoded-micon">
                    <i className="ti-angle-right" />
                  </span>
                  <span className="pcoded-mtext">
                    <FormattedMessage id="Find Account" />
                  </span>
                  <span className="pcoded-mcaret" />
                </a>
              </li>
              <li className="">
                <a href="dashboard-ecommerce.html">
                  <span className="pcoded-micon">
                    <i className="ti-angle-right" />
                  </span>
                  <span className="pcoded-mtext">
                    <FormattedMessage id="Create Account" />
                  </span>
                  <span className="pcoded-mcaret" />
                </a>
              </li>
              <li className="">
                <a href="dashboard-crm.html">
                  <span className="pcoded-micon">
                    <i className="ti-angle-right" />
                  </span>
                  <span className="pcoded-mtext">
                    <FormattedMessage id="Delegate" />
                  </span>
                  <span className="pcoded-badge label label-info ">Stake</span>
                  <span className="pcoded-mcaret" />
                </a>
              </li>
              <li className=" ">
                <a href="dashboard-analytics.html">
                  <span className="pcoded-micon">
                    <i className="ti-angle-right" />
                  </span>
                  <span className="pcoded-mtext">
                    <FormattedMessage id="Undelegate" />
                  </span>
                  <span className="pcoded-badge label label-info ">Unstake</span>
                  <span className="pcoded-mcaret" />
                </a>
              </li>
              <li className=" ">
                <a href="dashboard-project.html">
                  <span className="pcoded-micon">
                    <i className="ti-angle-right" />
                  </span>
                  <span className="pcoded-mtext">
                    <FormattedMessage id="Buy Ram" />
                  </span>
                  <span className="pcoded-badge label label-info ">EOS</span>
                  <span className="pcoded-mcaret" />
                </a>
              </li>
              <li className=" ">
                <a href="dashboard-project.html">
                  <span className="pcoded-micon">
                    <i className="ti-angle-right" />
                  </span>
                  <span className="pcoded-mtext">
                    <FormattedMessage id="Sell Ram" />
                  </span>
                  <span className="pcoded-badge label label-info ">bytes</span>
                  <span className="pcoded-mcaret" />
                </a>
              </li>
              <li className=" ">
                <a href="dashboard-project.html">
                  <span className="pcoded-micon">
                    <i className="ti-angle-right" />
                  </span>
                  <span className="pcoded-mtext">
                    <FormattedMessage id="Refund" />
                  </span>
                  <span className="pcoded-mcaret" />
                </a>
              </li>
              <li className=" ">
                <a href="/findaccount">
                  <span className="pcoded-micon">
                    <i className="ti-angle-right" />
                  </span>
                  <span className="pcoded-mtext">
                    <FormattedMessage id="Permissions" />
                  </span>
                  <span className="pcoded-mcaret" />
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <ul className="pcoded-item pcoded-left-item">
          <li className="pcoded-hasmenu active pcoded-trigger">
            <a href=" ">
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
              <li className="active">
                <a href="/voting">
                  <span className="pcoded-micon">
                    <i className="ti-angle-right" />
                  </span>
                  <span className="pcoded-mtext">
                    <FormattedMessage id="Do Voting" />
                  </span>
                  <span className="pcoded-mcaret" />
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
