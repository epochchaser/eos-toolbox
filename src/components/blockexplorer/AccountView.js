import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'

@inject('explorerStore')
@observer
class AccountView extends Component {
  constructor(props) {
    super(props)
    let { explorerStore } = this.props
    this.explorerStore = explorerStore
  }

  render() {
    return (
      <div className="col-lg-4 col-md-12">
        <div className="card user-card">
          <div className="card-header">
            <h5>
              <FormattedMessage id="Profile" />
            </h5>
          </div>
          <div className="card-block">
            <div className="usre-image">
              <img
                src="https://steemitimages.com/DQmeY3HLRU3Q2dhKgdqcuj52sbw7wdQdBvzzCjP2s2izNdU/2017-05-11%20(2).png"
                className="img-radius"
                alt="EOS Logo"
                style={{ width: '100px', height: '100px' }}
              />
            </div>
            <h6 className="f-w-600 m-t-25 m-b-10">{this.explorerStore.account.account_name}</h6>
            <p className="text-muted">Active | Male | Born 23.05.1992</p>
            <hr />
            <p className="text-muted m-t-15">Activity Level: 87%</p>
            <ul className="list-unstyled activity-leval">
              <li className="active" />
              <li className="active" />
              <li className="active" />
              <li />
              <li />
            </ul>
            <div className="bg-c-blue counter-block m-t-10 p-20">
              <div className="row">
                <div className="col-4">
                  <i className="ti-comments" />
                  <p>1256</p>
                </div>
                <div className="col-4">
                  <i className="ti-user" />
                  <p>8562</p>
                </div>
                <div className="col-4">
                  <i className="ti-bag" />
                  <p>189</p>
                </div>
              </div>
            </div>
            <p className="m-t-15 text-muted">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <hr />
            <div className="row justify-content-center user-social-link">
              <div className="col-auto">
                <a href="#!">
                  <i className="fa fa-facebook text-facebook" />
                </a>
              </div>
              <div className="col-auto">
                <a href="#!">
                  <i className="fa fa-twitter text-twitter" />
                </a>
              </div>
              <div className="col-auto">
                <a href="#!">
                  <i className="fa fa-dribbble text-dribbble" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountView
