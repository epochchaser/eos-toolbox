import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ecc from 'eosjs-ecc'

@inject('commonStore')
@observer
class CreateKey extends Component {
  constructor() {
    super()

    this.state = {
      privateKey: '',
      publicKey: '',
      copiedPrivateKey: false,
      copiedPublicKey: false
    }
  }

  createKey = async () => {
    let { commonStore } = this.props
    commonStore.isLoading = true

    const privateKeyPair = await this.genKeyPair()

    this.setState({
      privateKey: privateKeyPair.privateKey,
      publicKey: privateKeyPair.publicKey
    })

    commonStore.isLoading = false
  }

  genKeyPair = async () => {
    const privateKey = await ecc.randomKey()

    if (privateKey) {
      const publicKey = ecc.privateToPublic(privateKey)

      return {
        privateKey,
        publicKey
      }
    }

    return {
      privateKey: '',
      publicKey: ''
    }
  }

  render() {
    return (
      <Fragment>
        <div className="page-wrapper">
          <div className="page-body">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <h5>
                      <FormattedMessage id="Create Key" />
                    </h5>
                  </div>
                  <div className="card-block">
                    <div className="form-group row">
                      <div className="col-sm-2">
                        <label className="col-form-label" htmlFor="inputPrivateKey">
                          <FormattedMessage id="Private Key" />
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Private Key"
                          id="inputPrivateKey"
                          value={this.state.privateKey}
                          disabled={true}
                        />
                      </div>
                      <div className="col-sm-2">
                        <CopyToClipboard
                          text={this.state.privateKey}
                          onCopy={() =>
                            this.setState({ copiedPrivateKey: true, copiedPublicKey: false })
                          }
                        >
                          <button className="btn btn-primary btn-sm">
                            <FormattedMessage id="Copy" />
                          </button>
                        </CopyToClipboard>
                        {this.state.copiedPrivateKey && this.state.privateKey ? (
                          <span style={{ color: 'red' }}>
                            {' '}
                            <FormattedMessage id="Copied" />.
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-2">
                        <label className="col-form-label" htmlFor="inputPublicKey">
                          <FormattedMessage id="Public Key" />
                        </label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Public Key"
                          id="inputPublicKey"
                          value={this.state.publicKey}
                          disabled={true}
                        />
                      </div>
                      <div className="col-sm-2">
                        <CopyToClipboard
                          text={this.state.publicKey}
                          onCopy={() =>
                            this.setState({ copiedPublicKey: true, copiedPrivateKey: false })
                          }
                        >
                          <button className="btn btn-primary btn-sm">
                            <FormattedMessage id="Copy" />
                          </button>
                        </CopyToClipboard>
                        {this.state.copiedPublicKey && this.state.publicKey ? (
                          <span style={{ color: 'red' }}>
                            {' '}
                            <FormattedMessage id="Copied" />.
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 offset-lg-3">
                        <div className="card-block text-center">
                          <button
                            className="btn btn-success btn-md btn-round"
                            onClick={this.createKey}
                          >
                            <FormattedMessage id="Create Key" />
                          </button>
                        </div>
                      </div>
                    </div>
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

export default CreateKey
