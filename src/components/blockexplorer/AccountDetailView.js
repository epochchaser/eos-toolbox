import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'

@inject('explorerStore')
@observer
class AccountDetailView extends Component {
  render() {
    return (
      <Fragment>
        <ul class="nav nav-tabs md-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#home3" role="tab">
              <i class="fa fa-home" />Home
            </a>
            <div class="slide bg-c-blue" />
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#profile3" role="tab">
              <i class="fa fa-key" />Permission Group
            </a>
            <div class="slide bg-c-green" />
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#messages3" role="tab">
              <i class="fa fa-play-circle" />Created
            </a>
            <div class="slide bg-c-pink" />
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#settings3" role="tab">
              <i class="fa fa-database" />Vote
            </a>
            <div class="slide bg-c-yellow" />
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#settings3" role="tab">
              <i class="fa fa-database" />Bid Account Rule
            </a>
            <div class="slide bg-c-yellow" />
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#settings3" role="tab">
              <i class="fa fa-database" />Other Actions
            </a>
            <div class="slide bg-c-yellow" />
          </li>
        </ul>

        <div class="tab-content card-block">
          <div class="tab-pane active" id="home3" role="tabpanel">
            <div class="table-responsive">
              <table class="table">
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
                      class="img-fluid"
                    />
                  </td>
                  <td>PNG002344</td>
                  <td>John Deo</td>
                  <td>05-01-2017</td>
                  <td>
                    <span class="label label-danger">Faild</span>
                  </td>
                  <td>#7234486</td>
                </tr>
                <tr>
                  <td>
                    <img
                      src="../files/assets/images/product/prod3.jpg"
                      alt="prod img"
                      class="img-fluid"
                    />
                  </td>
                  <td>PNG002653</td>
                  <td>Eugine Turner</td>
                  <td>04-01-2017</td>
                  <td>
                    <span class="label label-success">Delivered</span>
                  </td>
                  <td>#7234417</td>
                </tr>
                <tr>
                  <td>
                    <img
                      src="../files/assets/images/product/prod4.jpg"
                      alt="prod img"
                      class="img-fluid"
                    />
                  </td>
                  <td>PNG002156</td>
                  <td>Jacqueline Howell</td>
                  <td>03-01-2017</td>
                  <td>
                    <span class="label label-warning">Pending</span>
                  </td>
                  <td>#7234454</td>
                </tr>
              </table>
            </div>
            <div class="text-center">
              <button class="btn btn-outline-primary btn-round btn-sm">Load More</button>
            </div>
          </div>
          <div class="tab-pane" id="profile3" role="tabpanel">
            <div class="table-responsive">
              <table class="table">
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
                      src="../files/assets/images/product/prod3.jpg"
                      alt="prod img"
                      class="img-fluid"
                    />
                  </td>
                  <td>PNG002653</td>
                  <td>Eugine Turner</td>
                  <td>04-01-2017</td>
                  <td>
                    <span class="label label-success">Delivered</span>
                  </td>
                  <td>#7234417</td>
                </tr>
                <tr>
                  <td>
                    <img
                      src="../files/assets/images/product/prod4.jpg"
                      alt="prod img"
                      class="img-fluid"
                    />
                  </td>
                  <td>PNG002156</td>
                  <td>Jacqueline Howell</td>
                  <td>03-01-2017</td>
                  <td>
                    <span class="label label-warning">Pending</span>
                  </td>
                  <td>#7234454</td>
                </tr>
              </table>
            </div>
            <div class="text-center">
              <button class="btn btn-outline-primary btn-round btn-sm">Load More</button>
            </div>
          </div>
          <div class="tab-pane" id="messages3" role="tabpanel">
            <div class="table-responsive">
              <table class="table">
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
                      src="../files/assets/images/product/prod1.jpg"
                      alt="prod img"
                      class="img-fluid"
                    />
                  </td>
                  <td>PNG002413</td>
                  <td>Jane Elliott</td>
                  <td>06-01-2017</td>
                  <td>
                    <span class="label label-primary">Shipping</span>
                  </td>
                  <td>#7234421</td>
                </tr>
                <tr>
                  <td>
                    <img
                      src="../files/assets/images/product/prod4.jpg"
                      alt="prod img"
                      class="img-fluid"
                    />
                  </td>
                  <td>PNG002156</td>
                  <td>Jacqueline Howell</td>
                  <td>03-01-2017</td>
                  <td>
                    <span class="label label-warning">Pending</span>
                  </td>
                  <td>#7234454</td>
                </tr>
              </table>
            </div>
            <div class="text-center">
              <button class="btn btn-outline-primary btn-round btn-sm">Load More</button>
            </div>
          </div>
          <div class="tab-pane" id="settings3" role="tabpanel">
            <div class="table-responsive">
              <table class="table">
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
                      src="../files/assets/images/product/prod1.jpg"
                      alt="prod img"
                      class="img-fluid"
                    />
                  </td>
                  <td>PNG002413</td>
                  <td>Jane Elliott</td>
                  <td>06-01-2017</td>
                  <td>
                    <span class="label label-primary">Shipping</span>
                  </td>
                  <td>#7234421</td>
                </tr>
                <tr>
                  <td>
                    <img
                      src="../files/assets/images/product/prod2.jpg"
                      alt="prod img"
                      class="img-fluid"
                    />
                  </td>
                  <td>PNG002344</td>
                  <td>John Deo</td>
                  <td>05-01-2017</td>
                  <td>
                    <span class="label label-danger">Faild</span>
                  </td>
                  <td>#7234486</td>
                </tr>
              </table>
            </div>
            <div class="text-center">
              <button class="btn btn-outline-primary btn-round btn-sm">Load More</button>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default AccountDetailView
