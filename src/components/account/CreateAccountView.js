import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'
import EosAgent from '../../EosAgent'
import Swal from 'sweetalert2'

@inject('accountStore')
@observer
class CreateAccountView extends Component {
  onInputChange = name => event => {
    const { accountStore } = this.props
    const validationValue = event.target.value

    if ('accoutname' === name) {
      accountStore.validateAccountName(validationValue)
    } else if ('owner' === name) {
      accountStore.validateOwner(validationValue)
    } else if ('ownerpubkey' === name) {
      accountStore.validateOwnerPubKey(validationValue)
    } else if ('activepubkey' === name) {
      accountStore.validateActivePubKey(validationValue)
    } else if ('cpustake' === name) {
      accountStore.validateCpuStake(validationValue)
    } else if ('netstake' === name) {
      accountStore.validateNetStake(validationValue)
    } else if ('rampurchase' === name) {
      accountStore.validateRamPurchase(validationValue)
    }
  }

  render() {
    const { accountStore } = this.props
    const {
      isAccountNameValid,
      isOwnerValid,
      isOwnerPublicKeyValid,
      isActivePublicKeyValid,
      isCPUstakeValid,
      isNETstakeValid,
      isRAMpurchaseValid,
      accountNameInput,
      ownerInput,
      ownerPubKeyInput,
      activePubKeyInput,
      cpuStakeInput,
      netStakeInput,
      ramPurchaseInput,
      transferInput
    } = accountStore

    const accountNameForm = isAccountNameValid ? 'form-group row' : 'form-group has-danger row'
    const ownerForm = isOwnerValid ? 'form-group row' : 'form-group has-danger row'
    const ownerPublicKeyForm = isOwnerPublicKeyValid
      ? 'form-group row'
      : 'form-group has-danger row'
    const activePublicKeyForm = isActivePublicKeyValid
      ? 'form-group row'
      : 'form-group has-danger row'
    const cpuStakeForm = isCPUstakeValid ? 'form-group row' : 'form-group has-danger row'
    const netStakeForm = isNETstakeValid ? 'form-group row' : 'form-group has-danger row'
    const ramPurchaseForm = isRAMpurchaseValid ? 'form-group row' : 'form-group has-danger row'

    return (
      accountStore &&
      accountStore.account &&
      accountStore.accountInfo && (
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h5>Create Account</h5>
              <span>
                Create your <code> new account</code> with <code>information</code> below
              </span>
            </div>
            <div className="card-block">
              <div className={accountNameForm}>
                <div className="col-sm-2">
                  <label className="col-form-label" for="newAccountInputDanger">
                    New account name
                  </label>
                </div>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="12 characters, a-z, 1-5"
                    id="newAccountInputDanger"
                    value={accountNameInput}
                    onChange={this.onInputChange('accoutname')}
                  />

                  {!isAccountNameValid && (
                    <div className="col-form-label">Invalid account name.</div>
                  )}
                </div>
              </div>

              <div className={ownerForm}>
                <div className="col-sm-2">
                  <label className="col-form-label" for="ownerInputDanger">
                    Owner
                  </label>
                </div>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Account that performs action"
                    id="ownerInputDanger"
                    value={ownerInput}
                    onChange={this.onInputChange('owner')}
                  />

                  {!isOwnerValid && <div className="col-form-label">Owner cannot be empty</div>}
                </div>
              </div>

              <div className={ownerPublicKeyForm}>
                <div className="col-sm-2">
                  <label className="col-form-label" for="ownerPublicKeyInputDanger">
                    Owner public key
                  </label>
                </div>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Owner pubkey is required"
                    id="ownerPublicKeyInputDanger"
                    value={ownerPubKeyInput}
                    onChange={this.onInputChange('ownerpubkey')}
                  />

                  {!isOwnerPublicKeyValid && (
                    <div className="col-form-label">Owner pubkey cannot be empty</div>
                  )}
                </div>
              </div>

              <div className={activePublicKeyForm}>
                <div className="col-sm-2">
                  <label className="col-form-label" for="activePublicKeyInputDanger">
                    Active public key
                  </label>
                </div>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Active pubkey is required"
                    id="activePublicKeyInputDanger"
                    value={activePubKeyInput}
                    onChange={this.onInputChange('activepubkey')}
                  />

                  {!isActivePublicKeyValid && (
                    <div className="col-form-label">Active pubkey cannot be empty</div>
                  )}
                </div>
              </div>

              <div className={cpuStakeForm}>
                <div className="col-sm-2">
                  <label className="col-form-label" for="cpuStakeInputDanger">
                    CPU Stake (in EOS)
                  </label>
                </div>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Required to process transaction"
                    id="cpuStakeInputDanger"
                    value={cpuStakeInput}
                    onChange={this.onInputChange('cpustake')}
                  />

                  {!isCPUstakeValid && <div className="col-form-label">CPU Stake is requied</div>}
                </div>
              </div>

              <div className={netStakeForm}>
                <div className="col-sm-2">
                  <label className="col-form-label" for="netStakeInputDanger">
                    NET Stake (in EOS)
                  </label>
                </div>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Required to use network"
                    id="netStakeInputDanger"
                    value={netStakeInput}
                    onChange={this.onInputChange('netstake')}
                  />

                  {!isNETstakeValid && <div className="col-form-label">NET Stake is requied</div>}
                </div>
              </div>

              <div className={ramPurchaseForm}>
                <div className="col-sm-2">
                  <label className="col-form-label" for="ramPurchaseInputDanger">
                    RAM purchase (in bytes)
                  </label>
                </div>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Required to store account"
                    id="ramPurchaseInputDanger"
                    value={ramPurchaseInput}
                    onChange={this.onInputChange('rampurchase')}
                  />

                  {!isRAMpurchaseValid && (
                    <div className="col-form-label">RAM purchase is required</div>
                  )}
                </div>
              </div>

              <div className={ramPurchaseForm}>
                <div className="col-sm-2">
                  <label className="col-form-label">Transfer</label>
                </div>
                <div className="col-sm-10">
                  <span
                    className="switchery switchery-default"
                    style={{
                      backgroundColor: 'blue',
                      borderColor: 'white',
                      boxShadow: 'grey 0px 0px 0px 16px inset',
                      transition: 'border 0.4s, boxShadow 0.4s, backgroundColor 1.2s'
                    }}
                  >
                    <small style={{ marginLeft: '20px', backgroundColor: 'red' }} />
                  </span>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 offset-lg-3">
                  <div className="card-block text-center">
                    <button className="btn btn-success btn-md btn-round">
                      <FormattedMessage id="Create Account" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    )
  }
}

export default CreateAccountView
