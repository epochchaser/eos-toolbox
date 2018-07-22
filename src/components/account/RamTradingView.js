import React, { Component, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import { inject, observer } from '../../../node_modules/mobx-react'
import * as Values from '../../constants/Values'

@inject('accountStore')
@observer
class RamTradingView extends Component {
  componentDidMount = () => {
    const { accountStore } = this.props
    accountStore.changeRamPurchaseUnit(Values.RAM_PURCHASE_UNIT_EOS)
  }

  changeRamPurchaseUnit = e => {}

  onInputChange = name => event => {
    const { accountStore } = this.props
    const validationValue = event.target.value

    if (name === 'receiveraccount') {
      accountStore.validateReceiverAccountName(validationValue)
    } else if (name === 'rampurchase') {
      accountStore.validateRamPurchase(validationValue)
    }
  }

  render() {
    const { accountStore } = this.props
    const {
      isReceiverAccountValid,
      isRAMpurchaseValid,
      receiverAccountNameInput,
      ramPurchaseUnit,
      ramPurchaseInput
    } = accountStore

    const ramPurchaseUnitString =
      accountStore.RAM_PURCHASE_UNIT_EOS === ramPurchaseUnit
        ? 'RAM purchase (in EOS)'
        : 'RAM purchase (in bytes)'
    const receiverAccountNameForm = isReceiverAccountValid
      ? 'form-group row'
      : 'form-group has-danger row'

    const ramPurchaseForm = isRAMpurchaseValid ? 'form-group row' : 'form-group has-danger row'
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
              <div className="preloader3 loader-block">
                <div className="circ1" />
                <div className="circ2" />
                <div className="circ3" />
                <div className="circ4" />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default RamTradingView
