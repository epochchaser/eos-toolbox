import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'
import EosAgent from '../../EosAgent'
import Swal from 'sweetalert2'

@inject('accountStore')
@observer
class CreateAccountView extends Component {
  render() {
    const { accountStore } = this.props
    const {
      isAccountNameValid,
      isOwnerValid,
      isOwnerPublicKeyValid,
      isActivePublicKeyValid,
      isCPUstakeValid,
      isNETstakeValid,
      isRAMpurchaseValid
    } = accountStore

    const accountNameForm = isAccountNameValid ? 'form-control' : 'form-control form-control-danger'
    const ownerForm = isOwnerValid ? 'form-control' : 'form-control form-control-danger'
    const ownerPublicKeyForm = isOwnerPublicKeyValid
      ? 'form-control'
      : 'form-control form-control-danger'
    const activePublicKeyForm = isActivePublicKeyValid
      ? 'form-control'
      : 'form-control form-control-danger'
    const cpuStakeForm = isCPUstakeValid ? 'form-control' : 'form-control form-control-danger'
    const netStakeForm = isNETstakeValid ? 'form-control' : 'form-control form-control-danger'
    const ramPurchaseForm = isRAMpurchaseValid ? 'form-control' : 'form-control form-control-danger'

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
              <form>
                <div className="row">
                  <label className="col-sm-4 col-lg-2 col-form-label">New account name</label>
                  <div className="col-sm-8 col-lg-10">
                    <div className="input-group">
                      <input
                        type="text"
                        class={accountNameForm}
                        placeholder="12 characters, a-z, 1-5"
                      />
                    </div>
                    {!isAccountNameValid && (
                      <div className="col-form-label">Invalid account name</div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-4 col-lg-2 col-form-label">Owner</label>
                  <div className="col-sm-8 col-lg-10">
                    <div className="input-group">
                      <input
                        type="text"
                        class={ownerForm}
                        placeholder="Account that performs action"
                      />
                    </div>
                    {!isOwnerValid && <div className="col-form-label">Owner cannot be empty</div>}
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-4 col-lg-2 col-form-label">Owner public key</label>
                  <div className="col-sm-8 col-lg-10">
                    <div className="input-group">
                      <input
                        type="text"
                        class={ownerPublicKeyForm}
                        placeholder="Owner pubkey is required"
                      />
                    </div>
                    {!isOwnerPublicKeyValid && (
                      <div className="col-form-label">Owner pubkey cannot be empty</div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-4 col-lg-2 col-form-label">Active public key</label>
                  <div className="col-sm-8 col-lg-10">
                    <div className="input-group">
                      <input
                        type="text"
                        class={activePublicKeyForm}
                        placeholder="Active pubkey is required"
                      />
                    </div>
                    {!isActivePublicKeyValid && (
                      <div className="col-form-label">Active pubkey cannot be empty</div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-4 col-lg-2 col-form-label">CPU Stake (in EOS)</label>
                  <div className="col-sm-8 col-lg-10">
                    <div className="input-group">
                      <input
                        type="number"
                        class={cpuStakeForm}
                        placeholder="Required to process transaction"
                      />
                    </div>
                    {!isCPUstakeValid && (
                      <div className="col-form-label">Cpu stake is required</div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-4 col-lg-2 col-form-label">NET Stake (in EOS)</label>
                  <div className="col-sm-8 col-lg-10">
                    <div className="input-group">
                      <input
                        type="number"
                        class={netStakeForm}
                        placeholder="Required to use network"
                      />
                    </div>
                    {!isNETstakeValid && (
                      <div className="col-form-label">Net stake is required</div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-4 col-lg-2 col-form-label">
                    Ram purchase (in bytes)
                  </label>
                  <div className="col-sm-8 col-lg-10">
                    <div className="input-group">
                      <input
                        type="number"
                        class={ramPurchaseForm}
                        placeholder="Required to store account"
                      />
                    </div>
                    {!isRAMpurchaseValid && (
                      <div className="col-form-label">RAM purchase is required</div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <label className="col-sm-4 col-lg-2 col-form-label">Transfer</label>
                  <div className="col-sm-8 col-lg-10">
                    <div className="input-group">
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
              </form>
            </div>
          </div>
        </div>
      )
    )
  }
}

export default CreateAccountView
