import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'

@inject('accountStore')
@observer
class ResourceView extends Component {
  constructor(props) {
    super(props)
    let { accountStore } = this.props
    this.accountStore = accountStore
  }

  render() {
    return (
      <Fragment>
        <div className="main-body">
          <div className="page-wrapper">
            <div className="page-body">
              <div className="row">
                <div className="col-md-12 col-xl-12">
                  <div className="card summery-card">
                    <div className="card-header">
                      <div className="card-header-left ">
                        <h5>Resources</h5>
                      </div>
                      <div className="card-header-right">
                        <ul className="list-unstyled card-option">
                          <li>
                            <i className="icofont icofont-simple-left " />
                          </li>
                          <li>
                            <i className="icofont icofont-maximize full-card" />
                          </li>
                          <li>
                            <i className="icofont icofont-minus minimize-card" />
                          </li>
                          <li>
                            <i className="icofont icofont-refresh reload-card" />
                          </li>
                          <li>
                            <i className="icofont icofont-error close-card" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-block" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default ResourceView
