import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

class Donation extends Component {
  render() {
    return (
      <section class="login p-fixed d-flex text-center bg-primary common-img-bg">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12">
              <div class="login-card card-block auth-body mr-auto ml-auto">
                <form class="md-float-material">
                  <div class="auth-box">
                    <div class="row">
                      <div class="col-md-12">
                        <h3 class="text-center">
                          <i class="icofont icofont-money text-primary f-80" />
                        </h3>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <a
                          href="https://commerce.coinbase.com/checkout/fa41f2f6-3150-47e1-9bb6-eb79e20197ef"
                          class="btn btn-primary btn-md btn-block waves-effect text-center m-b-20"
                          target="_blank"
                        >
                          <i class="icofont icofont-money" /> <FormattedMessage id="Donation" />{' '}
                        </a>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-md-10">
                        <p class="text-inverse text-left m-b-0">
                          <FormattedMessage id="Thank you and enjoy our website" />.
                        </p>
                        <p class="text-inverse text-left">
                          <b>
                            <FormattedMessage id="EOSUITE TEAM" />
                          </b>
                        </p>
                      </div>
                      <div class="col-md-2" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807" />
      </section>
    )
  }
}

export default Donation
