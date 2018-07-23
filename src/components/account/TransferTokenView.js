import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'
import Swal from 'sweetalert2'

@inject('accountStore')
@observer
class TransferTokenView extends Component {
  constructor(props) {
    super(props)
    const { accountStore } = this.props
    this.accountStore = accountStore

    this.state = {
      selectedIndex: 0,
      tokenSymbol: '',
      tokenQuantity: 0,
      transferQuantityInput: 0,
      isTransferQuantityValid: false,
      receiverAccountNameInput: '',
      isReceiverAccountValid: false,
      memoInput: '',
      isMemoValid: false
    }
  }

  componentDidMount = async () => {
    await this.accountStore.getAccountTokens(this.accountStore.accountInfo.account_name)

    const token = this.accountStore.tokens[0].split(' ')

    this.setState({
      tokenSymbol: token[1],
      tokenQuantity: token[0]
    })
  }

  onTokenSelected = event => {
    const token = this.accountStore.tokens[event.target.selectedIndex].split(' ')

    this.setState({
      selectedIndex: event.target.selectedIndex,
      tokenSymbol: token[1],
      tokenQuantity: token[0]
    })
  }

  onInputChange = name => event => {
    const validationValue = event.target.value

    if (name === 'receiveraccount') {
      this.setState({
        receiverAccountNameInput: validationValue,
        isReceiverAccountValid: validationValue ? true : false
      })
    } else if (name === 'transferquantity') {
      this.setState({
        transferQuantityInput: validationValue,
        isTransferQuantityValid: validationValue <= this.state.tokenQuantity ? true : false
      })
    } else if (name === 'memo') {
      this.setState({
        memoInput: validationValue,
        isMemoValid: validationValue ? true : false
      })
    }
  }

  transferToken = () => {
    if (!this.accountStore || !this.accountStore.account || !this.accountStore.accountInfo) return

    Swal({
      title: 'Transfer Token',
      text:
        'By executing this action you are agreeing to the EOS constitution and this actions associated ricardian contract.',
      showCancelButton: true,
      confirmButtonText: 'Create',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return this.accountStore
          .transferToken()
          .then(async response => {
            await this.accountStore.loadAccountInfo()
            await this.accountStore.seedTransferTokenInput()
            return response
          })
          .catch(err => {
            if (err) {
              if (err.message) {
                Swal.showValidationError(err.message)
                return
              }

              const parsedResult = JSON.parse(err)

              if (parsedResult.error.details && parsedResult.error.details.length > 0) {
                Swal.showValidationError(parsedResult.error.details[0].message)
              } else {
                Swal.showValidationError(parsedResult.message)
              }
            } else {
              Swal.showValidationError(err)
            }
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.value) {
        Swal('Good job!', 'Your transaction(s) have been submitted to the blockchain.', 'success')
      }
    })
  }

  render() {
    const receiverAccountNameForm = this.state.isReceiverAccountValid
      ? 'form-group row'
      : 'form-group has-danger row'

    const quantityForm = this.state.isTransferQuantityValid
      ? 'form-group row'
      : 'form-group has-danger row'

    const canSubmit = this.state.isReceiverAccountValid && this.state.isTransferQuantityValid

    const availableLiquid = Math.max(
      0,
      this.state.tokenQuantity - this.state.transferQuantityInput
    ).toFixed(4)

    const availablePercent =
      (this.state.tokenQuantity
        ? ((availableLiquid / this.state.tokenQuantity) * 100).toFixed(2)
        : 0) + '%'

    const availableChartStyle = {
      width: availablePercent
    }

    return (
      this.accountStore &&
      this.accountStore.account &&
      this.accountStore.accountInfo && (
        <Fragment>
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>
                  <FormattedMessage id="Simulation Summary" />
                </h5>
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-12">
                      <h2 className="f-w-600">
                        {availableLiquid} / {this.state.tokenQuantity} {this.state.tokenSymbol}
                      </h2>
                      <p className="text-muted f-w-600">
                        <FormattedMessage id="Available EOS (liquid)" />
                      </p>

                      <div className="progress">
                        <div
                          className="progress-bar bg-c-pink"
                          role="progressbar"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={availableChartStyle}
                        />
                      </div>
                    </div>

                    {/* <div className="col-sm-6 p-b-30">
                      <h2 className="f-w-600">
                        {afterTransfer} / {totalBalance} {this.state.tokenSymbol}
                      </h2>
                      <p className="text-muted f-w-600">
                        <FormattedMessage id="Total balance after trasfer token" />
                      </p>
                      <div className="progress">
                        <div
                          className="progress-bar bg-c-yellow"
                          role="progressbar"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={afterTransferChartStyle}
                        />
                      </div>
                    </div> */}
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>
                  <FormattedMessage id="Transfer Token" />
                </h5>
                <span>
                  Transfer <code> your token</code> with <code>information</code> below
                </span>
              </div>
              <div className="card-block">
                <div className="form-group row">
                  <div className="col-sm-2">
                    <label className="col-form-label" htmlFor="symbolInputDanger">
                      <FormattedMessage id="Symbol" />
                    </label>
                  </div>
                  <div className="col-sm-10">
                    {/* <input
                      type="text"
                      className="form-control"
                      placeholder="Symbol of the token"
                      id="symbolInputDanger"
                      value={transferSymbolInput}
                      onChange={this.onInputChange('transfersymbol')}
                    /> */}

                    {!this.accountStore.tokens && (
                      <div className="preloader4 m-0 p-0">
                        <div className="double-bounce1" />
                        <div className="double-bounce2" />
                      </div>
                    )}
                    {this.accountStore.tokens && (
                      <select
                        name="select"
                        className="form-control form-control-inverse"
                        value={this.state.selectedIndex}
                        onChange={this.onTokenSelected}
                      >
                        {this.accountStore.tokens.map((token, index) => {
                          return (
                            <option key={index} value={index}>
                              {token}
                            </option>
                          )
                        })}
                      </select>
                    )}
                  </div>
                </div>

                <div className={receiverAccountNameForm}>
                  <div className="col-sm-2">
                    <label className="col-form-label" htmlFor="receiverAccountNameInputDanger">
                      <FormattedMessage id="Receiver account name" />
                    </label>
                  </div>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Account that receives the token"
                      id="receiverAccountNameInputDanger"
                      maxLength="12"
                      value={this.state.receiverAccountNameInput}
                      onChange={this.onInputChange('receiveraccount')}
                    />

                    {!this.state.isReceiverAccountValid && (
                      <div className="col-form-label">
                        <FormattedMessage id="Account name is requied" />
                      </div>
                    )}
                  </div>
                </div>

                <div className={quantityForm}>
                  <div className="col-sm-2">
                    <label className="col-form-label" htmlFor="quantityInputDanger">
                      <FormattedMessage id="Quantity (in Tokens)" />
                    </label>
                  </div>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="How many tokens to send"
                      id="quantityInputDanger"
                      value={this.state.transferQuantityInput}
                      onChange={this.onInputChange('transferquantity')}
                    />

                    {!this.state.isTransferQuantityValid && (
                      <div className="col-form-label">
                        <FormattedMessage id="Quantity is requied" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-2">
                    <label className="col-form-label" htmlFor="memoInputDanger">
                      <FormattedMessage id="Memo" />
                    </label>
                  </div>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="A memo to attach to transfer"
                      id="memoInputDanger"
                      value={this.state.memoInput}
                      onChange={this.onInputChange('memo')}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 offset-lg-3">
                    <div className="card-block text-center">
                      <button
                        disabled={!canSubmit}
                        className="btn btn-success btn-md btn-round"
                        onClick={this.transferToken}
                      >
                        <FormattedMessage id="Transfer" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )
    )
  }
}

export default TransferTokenView
