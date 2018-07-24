import React, { Component, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import { inject, observer } from '../../../../node_modules/mobx-react'
import Swal from 'sweetalert2'
import * as Values from '../../../constants/Values'

@inject('accountStore')
@observer
class RamTradingView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isReceiverAccountValid: false,
      isRAMpurchaseValid: false,
      isRAMsellValid: false,
      isEosUnit: true,
      receiverAccountNameInput: '',
      ramPurchaseInput: Values.SEED_RAM_EOS,
      ramSellInput: 0.0
    }
  }

  changeRamPurchaseUnit = name => event => {
    let ramPurchaseInput
    let isEosUnit

    if (name === 'eosunit') {
      ramPurchaseInput = Values.SEED_RAM_EOS
      isEosUnit = true
    } else if (name === 'bytesunit') {
      ramPurchaseInput = Values.SEED_RAM_BYTES
      isEosUnit = false
    }

    this.setState({
      ramPurchaseInput,
      isEosUnit
    })
  }

  onInputChange = name => event => {
    const { accountStore } = this.props
    const validationValue = event.target.value

    if (name === 'receiveraccount') {
      this.setState({
        isReceiverAccountValid: accountStore.validateReceiverAccountName(validationValue),
        receiverAccountNameInput: validationValue
      })
    } else if (name === 'rampurchase') {
      this.setState({
        isRAMpurchaseValid: accountStore.validateRamPurchase(validationValue),
        ramPurchaseInput: validationValue
      })
    } else if (name === 'ramsell') {
      this.setState({
        isRAMsellValid: accountStore.validateRamSell(validationValue),
        ramSellInput: validationValue
      })
    }
  }

  buyRam = () => {
    const { accountStore } = this.props
    if (!accountStore || !accountStore.account || !accountStore.accountInfo) return
    const { isEosUnit, receiverAccountNameInput, ramPurchaseInput } = this.state

    Swal({
      title: 'Buy RAM',
      text:
        'By executing this action you are agreeing to the EOS constitution and this actions associated ricardian contract.',
      showCancelButton: true,
      confirmButtonText: 'Comfirm',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return accountStore
          .buyRAM(isEosUnit, receiverAccountNameInput, ramPurchaseInput)
          .then(async response => {
            await accountStore.loadAccountInfo()
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
  sellRam = () => {
    const { accountStore } = this.props
    if (!accountStore || !accountStore.account || !accountStore.accountInfo) return
    const { ramSellInput } = this.state

    Swal({
      title: 'Sell RAM',
      text:
        'By executing this action you are agreeing to the EOS constitution and this actions associated ricardian contract.',
      showCancelButton: true,
      confirmButtonText: 'Comfirm',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return accountStore
          .sellRAM(ramSellInput)
          .then(async response => {
            await accountStore.loadAccountInfo()
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
    const {
      isReceiverAccountValid,
      isEosUnit,
      isRAMpurchaseValid,
      isRAMsellValid,
      receiverAccountNameInput,
      ramPurchaseInput,
      ramSellInput
    } = this.state

    const ramPurchaseUnitString = isEosUnit ? 'RAM purchase (in EOS)' : 'RAM purchase (in bytes)'
    const receiverAccountNameForm = isReceiverAccountValid
      ? 'form-group row'
      : 'form-group has-danger row'

    const ramPurchaseForm = isRAMpurchaseValid ? 'form-group row' : 'form-group has-danger row'
    const ramSellForm = isRAMsellValid ? 'form-group row' : 'form-group has-danger row'
    const canBuyRam = isReceiverAccountValid & isRAMpurchaseValid

    return (
      <Fragment>
        <div className="col-md-6">
          <div className="card ">
            <div className="card-header ">
              <div className="card-header-left ">
                <h5>
                  <FormattedMessage id="Buy RAM" />
                </h5>
              </div>
            </div>
            <div className="card-block ">
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
                    placeholder="The account that receives the RAM"
                    value={receiverAccountNameInput}
                    onChange={this.onInputChange('receiveraccount')}
                    id="receiverAccountNameInputDanger"
                  />

                  {!isReceiverAccountValid && (
                    <div className="col-form-label">
                      <FormattedMessage id="Account name is requied" />
                    </div>
                  )}
                </div>
              </div>

              <div className={ramPurchaseForm}>
                <div className="col-sm-2">
                  <label className="col-form-label" htmlFor="ramPurchaseInputDanger">
                    <FormattedMessage id={ramPurchaseUnitString} />
                  </label>
                </div>
                <div className="col-sm-10">
                  <div className="form-radio">
                    <form>
                      <div className="radio radio-inline">
                        <label>
                          <input
                            type="radio"
                            name="radio"
                            checked={isEosUnit}
                            onChange={this.changeRamPurchaseUnit('eosunit')}
                          />
                          <i className="helper" />EOS
                        </label>
                      </div>
                      <div className="radio radio-inline">
                        <label>
                          <input
                            type="radio"
                            name="radio"
                            onChange={this.changeRamPurchaseUnit('bytesunit')}
                          />
                          <i className="helper" />bytes
                        </label>
                      </div>
                    </form>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Required to process transaction"
                    value={ramPurchaseInput}
                    onChange={this.onInputChange('rampurchase')}
                    id="ramPurchaseInputDanger"
                  />

                  {!isRAMpurchaseValid && (
                    <div className="col-form-label">
                      <FormattedMessage id="RAM purchase is requied" />
                    </div>
                  )}
                </div>
              </div>

              <div className="card-block text-center">
                <button
                  disabled={!canBuyRam}
                  className="btn btn-success btn-md btn-round"
                  onClick={this.buyRam}
                >
                  <FormattedMessage id="Buy RAM" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card ">
            <div className="card-header ">
              <div className="card-header-left ">
                <h5>
                  <FormattedMessage id="Sell RAM" />
                </h5>
              </div>
            </div>
            <div className="card-block ">
              <div className={ramSellForm}>
                <div className="col-sm-2">
                  <label className="col-form-label" htmlFor="ramSellInputDanger">
                    <FormattedMessage id="RAM sell (in bytes)" />
                  </label>
                </div>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="How many bytes to sell"
                    value={ramSellInput}
                    onChange={this.onInputChange('ramsell')}
                    id="ramSellInputDanger"
                  />

                  {!isRAMsellValid && (
                    <div className="col-form-label">
                      <FormattedMessage id="RAM sell is requied" />
                    </div>
                  )}
                </div>
              </div>

              <div className="card-block text-center">
                <button
                  disabled={!isRAMsellValid}
                  className="btn btn-danger btn-md btn-round"
                  onClick={this.sellRam}
                >
                  <FormattedMessage id="Sell RAM" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default RamTradingView
