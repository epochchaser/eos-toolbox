import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import NumberFormat from 'react-number-format'
import UsageResourceView from '../UsageResourceView'

@observer
class TokenView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.tokens)
    return (
      <Fragment>
        {this.props.tokens &&
          this.props.tokens.length > 0 && (
            <Fragment>
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
            </Fragment>
          )}
      </Fragment>
    )
  }
}

export default TokenView
