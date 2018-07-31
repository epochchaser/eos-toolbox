import React, { Component, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import { format } from 'date-fns'

class AccountDetailView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'transfer'
    }
  }

  tabClick = name => e => {
    this.setState({
      selectedTab: name
    })
  }

  render() {
    const { transfers, permissions, newaccounts, votings } = this.props

    return (
      <Fragment>
        <ul className="nav nav-tabs md-tabs" role="tablist">
          <li className="nav-item">
            <a
              className={'nav-link' + (this.state.selectedTab === 'transfer' ? ' active' : '')}
              data-toggle="tab"
              role="tab"
              value="transfer"
              style={{ cursor: 'pointer' }}
              onClick={this.tabClick('transfer')}
            >
              <i className="fa fa-paper-plane-o" />
              <FormattedMessage id="Token Transfer" /> ({transfers ? transfers.length : 0})
            </a>
            <div className="slide bg-c-blue" />
          </li>
          <li className="nav-item">
            <a
              className={'nav-link' + (this.state.selectedTab === 'permission' ? ' active' : '')}
              data-toggle="tab"
              role="tab"
              value="test"
              style={{ cursor: 'pointer' }}
              onClick={this.tabClick('permission')}
            >
              <i className="fa fa-key" />
              <FormattedMessage id="Permission Group" /> ({permissions ? permissions.length : 0})
            </a>
            <div className="slide bg-c-green" />
          </li>
          <li className="nav-item">
            <a
              className={'nav-link' + (this.state.selectedTab === 'created' ? ' active' : '')}
              data-toggle="tab"
              role="tab"
              style={{ cursor: 'pointer' }}
              onClick={this.tabClick('created')}
            >
              <i className="fa fa-plus" />
              <FormattedMessage id="Create Account" /> ({newaccounts ? newaccounts.length : 0})
            </a>
            <div className="slide bg-c-pink" />
          </li>
          <li className="nav-item">
            <a
              className={'nav-link' + (this.state.selectedTab === 'vote' ? ' active' : '')}
              data-toggle="tab"
              role="tab"
              style={{ cursor: 'pointer' }}
              onClick={this.tabClick('vote')}
            >
              <i className="fa fa-thumbs-o-up" />
              <FormattedMessage id="Vote" /> ({votings ? votings.length : 0})
            </a>
            <div className="slide bg-c-yellow" />
          </li>
        </ul>

        <div className="tab-content card-block">
          <div
            className={'tab-pane' + (this.state.selectedTab === 'transfer' ? ' active' : '')}
            id="home3"
            role="tabpanel"
          >
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr>
                    <th>
                      <FormattedMessage id="Time" />
                    </th>
                    <th>
                      <FormattedMessage id="From" />
                    </th>
                    <th>
                      <FormattedMessage id="To" />
                    </th>
                    <th>
                      <FormattedMessage id="Quantity" />
                    </th>
                    <th>
                      <FormattedMessage id="Memo" />
                    </th>
                  </tr>

                  {transfers &&
                    transfers.map((t, index) => (
                      <tr key={index}>
                        <td> {t.creation}</td>
                        <td>{t.from}</td>
                        <td>{t.to}</td>
                        <td>{t.quantity}</td>
                        <td>{t.memo}</td>
                      </tr>
                    ))}

                  {(!votings || votings.length === 0) && (
                    <tr>
                      <td colSpan="5" className="text-center">
                        <FormattedMessage id="No Data" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="text-center">
              {/* <button className="btn btn-outline-primary btn-round btn-sm">Load More</button> */}
            </div>
          </div>

          <div
            className={'tab-pane' + (this.state.selectedTab === 'permission' ? ' active' : '')}
            id="profile3"
            role="tabpanel"
          >
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr>
                    <th>
                      <FormattedMessage id="Permission" />
                    </th>
                    <th>
                      <FormattedMessage id="Public Key" />
                    </th>
                    <th>
                      <FormattedMessage id="Threshold" />
                    </th>
                    <th>
                      <FormattedMessage id="Weight" />
                    </th>
                  </tr>

                  {permissions &&
                    permissions.map((p, index) => (
                      <tr key={index}>
                        <td> {p.perm_name}</td>
                        <td>{p.required_auth.keys[0].key}</td>
                        <td>{p.required_auth.threshold}</td>
                        <td>{p.required_auth.keys[0].weight}</td>
                      </tr>
                    ))}

                  {(!permissions || permissions.length === 0) && (
                    <tr>
                      <td colSpan="4" className="text-center">
                        <FormattedMessage id="No Data" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div
            className={'tab-pane' + (this.state.selectedTab === 'created' ? ' active' : '')}
            id="profile3"
            role="tabpanel"
          >
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr>
                    <th>
                      <FormattedMessage id="Account" />
                    </th>
                    <th>
                      <FormattedMessage id="Create Time" />
                    </th>
                  </tr>

                  {newaccounts &&
                    newaccounts.map((h, index) => (
                      <tr key={index}>
                        <td> {h.account}</td>
                        <td> {format(new Date(h.creation), 'YYYY-MM-DD HH:mm:ss.SSS')}</td>
                      </tr>
                    ))}

                  {(!newaccounts || newaccounts.length === 0) && (
                    <tr>
                      <td colSpan="2" className="text-center">
                        <FormattedMessage id="No Data" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default AccountDetailView
