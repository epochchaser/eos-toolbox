import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'

@inject('accountStore', 'explorerStore')
@observer
class AccountDetailView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'transfer'
    }
  }

  componentDidMount = () => {
    const { explorerStore } = this.props
    const accName = this.props.account

    explorerStore.getTransferHistory(accName)
  }

  tabClick = name => e => {
    const { accountStore, explorerStore } = this.props
    const accName = accountStore.account.name

    if (name == 'transfer') {
      explorerStore.getTransferHistory(accName)
    } else if (name === 'vote') {
      explorerStore.getVotingHistory(accName)
    } else if (name === 'created') {
      explorerStore.getNewAccountHistory(accName)
    }

    this.setState({
      selectedTab: name
    })
  }

  render() {
    const { accountStore, explorerStore } = this.props

    return (
      accountStore && (
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
                <i className="fa fa-paper-plane-o" />Token Transfer ({explorerStore.transferHistory
                  ? explorerStore.transferHistory.length
                  : 0})
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
                <i className="fa fa-key" />Permission Group ({accountStore.permissions
                  ? accountStore.permissions.length
                  : 0})
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
                <i className="fa fa-plus" />Created ({explorerStore.newAccountHistory
                  ? explorerStore.newAccountHistory.length
                  : 0})
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
                <i className="fa fa-thumbs-o-up" />Vote ({explorerStore.transferHistory
                  ? explorerStore.transferHistory.length
                  : 0})
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
                      <th>Time</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Quantity</th>
                      <th>Memo</th>
                    </tr>

                    {explorerStore.transferHistory &&
                      explorerStore.transferHistory.map((t, index) => (
                        <tr key={index}>
                          <td> {t.creation}</td>
                          <td>{t.from}</td>
                          <td>{t.to}</td>
                          <td>{t.quantity}</td>
                          <td>{t.memo}</td>
                        </tr>
                      ))}

                    {!explorerStore.transferHistory ||
                      (explorerStore.transferHistory.length === 0 && (
                        <tr>
                          <td colSpan="5" className="text-center">
                            <FormattedMessage id="No Data" />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="text-center">
                <button className="btn btn-outline-primary btn-round btn-sm">Load More</button>
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
                      <th>Permission</th>
                      <th>Account/Address</th>
                      <th>Threshold</th>
                      <th>Weight</th>
                    </tr>

                    {accountStore.permissions &&
                      accountStore.permissions.map((p, index) => (
                        <tr key={index}>
                          <td> {p.perm_name}</td>
                          <td>{p.required_auth.keys[0].key}</td>
                          <td>{p.required_auth.threshold}</td>
                          <td>{p.required_auth.keys[0].weight}</td>
                        </tr>
                      ))}

                    {!accountStore.permissions ||
                      (accountStore.permissions.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <FormattedMessage id="No Data" />
                          </td>
                        </tr>
                      ))}
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
                      <th>Account</th>
                      <th>Create Time</th>
                    </tr>

                    {explorerStore.newAccountHistory &&
                      explorerStore.newAccountHistory.map((h, index) => (
                        <tr key={index}>
                          <td> {h.account}</td>
                          <td>{h.creation}</td>
                        </tr>
                      ))}

                    {!explorerStore.newAccountHistory ||
                      (explorerStore.newAccountHistory.length === 0 && (
                        <tr>
                          <td colSpan="2" className="text-center">
                            <FormattedMessage id="No Data" />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Fragment>
      )
    )
  }
}

export default AccountDetailView
