import { observable, action } from 'mobx'
import EosAgent from '../EosAgent'

export class AccountStore {
  @observable isLogin = false
  @observable eosBalance = 0.0
  @observable accountInfo = null

  @action
  loadAccountInfo = async () => {
    let err, account, balance

    account = await EosAgent.getAccountInfo()
    this.accountInfo = account

    console.log(account)
    balance = await EosAgent.getCurrencyBalance('EOS')
    if (balance && balance.length > 0) {
      this.eosBalance = balance[0].split(' ')[0]
    } else {
      this.eosBalance = 0.0
    }
  }

  @action
  login = async () => {
    let account = await EosAgent.loginWithScatter()

    if (account) {
      this.account = account
      this.isLogin = true

      this.loadAccountInfo()
    }
  }

  @action
  logout = async () => {
    await EosAgent.logout()

    this.isLogin = false
    this.account = null
  }

  @action
  createNewAccount = async (
    owner,
    authority,
    newAccount,
    newAccountOwnerPubKey,
    newAccountActivePubKey,
    buyrambytes,
    stakeCpuQuantity,
    stakeNetQuantity
  ) => {
    const cb = tr => {
      const options = { authorization: [`${owner}@${authority}`] }

      tr.newaccount(
        {
          creator: owner,
          name: newAccount,
          owner: newAccountOwnerPubKey,
          active: newAccountActivePubKey
        },
        options
      )

      tr.buyrambytes(
        {
          payer: owner,
          receiver: newAccount,
          bytes: buyrambytes
        },
        options
      )

      tr.delegatebw(
        {
          from: owner,
          receiver: newAccount,
          stake_net_quantity: stakeNetQuantity + ' EOS',
          stake_cpu_quantity: stakeCpuQuantity + ' EOS',
          transfer: 0
        },
        options
      )
    }

    EosAgent.getTransaction(cb)
  }
}

export default new AccountStore()
