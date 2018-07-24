import React, { Component, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

class TokenView extends Component {
  render() {
    return (
      <Fragment>
        <div className="row m-l-10 m-b-20">
          <div className="col-sm-12 p-0">
            <h5>
              <FormattedMessage id="Tokens" />
            </h5>
          </div>
        </div>
        {(!this.props.tokens || this.props.tokens.length === 0) && (
          <div className="col-sm-12 p-0">
            <div className="card">
              <div className="card-block">
                {!this.props.tokens && (
                  <div className="preloader3 loader-block m-t-20" style={{ height: '9px' }}>
                    <div className="circ1" />
                    <div className="circ2" />
                    <div className="circ3" />
                    <div className="circ4" />
                  </div>
                )}
                {this.props.tokens &&
                  this.props.tokens.length === 0 && (
                    <h5 className="text-center">
                      <FormattedMessage id="No Tokens" />
                    </h5>
                  )}
              </div>
            </div>
          </div>
        )}
        {this.props.tokens && (
          <div className="row">
            {this.props.tokens.map((token, index) => (
              <div className="col-md-4 col-sm-6" key={index}>
                <div className="card user-card">
                  <div className="card-header">
                    <h5>{token.split(' ')[1]}</h5>
                  </div>
                  <div className="card-block">
                    <h4>{token.split(' ')[0]}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Fragment>
    )
  }
}

export default TokenView
