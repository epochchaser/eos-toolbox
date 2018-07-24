import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'

@inject('accountStore')
@observer
class AccountDetailView extends Component {
  render() {
    const { accountStore } = this.props
    return (
      accountStore && (
        <Fragment>
          <ul className="nav nav-tabs md-tabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                dataToggle="tab"
                href="#token-transfer"
                role="tab"
                ariaExpanded="true"
              >
                <i className="fa fa-home" />Token Transfer
              </a>
              <div className="slide bg-c-blue" />
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                dataToggle="tab"
                href="#permission-group-content"
                role="tab"
                ariaExpanded="false"
              >
                <i className="fa fa-key" />Permission Group
              </a>
              <div className="slide bg-c-green" />
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                dataToggle="tab"
                href="#messages3"
                role="tab"
                ariaExpanded="false"
              >
                <i className="fa fa-play-circle" />Created
              </a>
              <div className="slide bg-c-pink" />
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                dataToggle="tab"
                href="#settings3"
                role="tab"
                ariaExpanded="false"
              >
                <i className="fa fa-database" />Vote
              </a>
              <div className="slide bg-c-yellow" />
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                dataToggle="tab"
                href="#settings3"
                role="tab"
                ariaExpanded="false"
              >
                <i className="fa fa-database" />Bid Account Rule
              </a>
              <div className="slide bg-c-yellow" />
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                dataToggle="tab"
                href="#settings3"
                role="tab"
                ariaExpanded="false"
              >
                <i className="fa fa-database" />Other Actions
              </a>
              <div className="slide bg-c-yellow" />
            </li>
          </ul>

          <div className="tab-content card-block">
            <div
              className="tab-pane active"
              id="token-transfer"
              role="tabpanel"
              ariaExpanded="true"
            >
              <div className="table-responsive">
                <table className="table">
                  <tr>
                    <th>Image</th>
                    <th>Product Code</th>
                    <th>Customer</th>
                    <th>Purchased On</th>
                    <th>Status</th>
                    <th>Transaction ID</th>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src="../files/assets/images/product/prod2.jpg"
                        alt="prod img"
                        className="img-fluid"
                      />
                    </td>
                    <td>PNG002344</td>
                    <td>John Deo</td>
                    <td>05-01-2017</td>
                    <td>
                      <span className="label label-danger">Faild</span>
                    </td>
                    <td>#7234486</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src="../files/assets/images/product/prod3.jpg"
                        alt="prod img"
                        className="img-fluid"
                      />
                    </td>
                    <td>PNG002653</td>
                    <td>Eugine Turner</td>
                    <td>04-01-2017</td>
                    <td>
                      <span className="label label-success">Delivered</span>
                    </td>
                    <td>#7234417</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src="../files/assets/images/product/prod4.jpg"
                        alt="prod img"
                        className="img-fluid"
                      />
                    </td>
                    <td>PNG002156</td>
                    <td>Jacqueline Howell</td>
                    <td>03-01-2017</td>
                    <td>
                      <span className="label label-warning">Pending</span>
                    </td>
                    <td>#7234454</td>
                  </tr>
                </table>
              </div>
              <div className="text-center">
                <button className="btn btn-outline-primary btn-round btn-sm">Load More</button>
              </div>
            </div>
            <div
              className="tab-pane"
              id="permission-group-content"
              role="tabpanel"
              ariaExpanded="false"
            >
              <div className="table-responsive">
                <table className="table">
                  <tr>
                    <th>Permission</th>
                    <th>Account/Address</th>
                    <th>Threshold</th>
                    <th>Weight</th>
                  </tr>
                  {accountStore.permissions &&
                    accountStore.permissions.map(p => (
                      <tr>
                        <td>p.perm_name</td>
                        <td>p.required_auth.keys[0].key</td>
                        <td>p_required_auth.threshold</td>
                        <td>p.required_auth.keys[0].weight</td>
                        <td>
                          <span className="label label-success">Delivered</span>
                        </td>
                        <td>#7234417</td>
                      </tr>
                    ))}
                </table>
              </div>
              <div className="text-center">
                <button className="btn btn-outline-primary btn-round btn-sm">Load More</button>
              </div>
            </div>
          </div>
        </Fragment>
      )
    )
  }
}

export default AccountDetailView
