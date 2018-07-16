import { decorate, observable, action } from 'mobx'
import EosAgent from '../EosAgent'

export class AccountStore {
  isLogin = false
  eosBalance = 0.0
  accountInfo = null
  account = null
  myBlockProducers = null

  loadAccountInfo = async () => {
    let accountInfo, balance

    accountInfo = await EosAgent.getAccountInfo()

    if (accountInfo) {
      this.accountInfo = accountInfo
      const myProducers = Object.keys(accountInfo.voter_info.producers).map(k => {
        return accountInfo.voter_info.producers[k]
      })

      this.myBlockProducers = myProducers.sort()
      console.log(this.blockProducers)
      this.account = EosAgent.loginaccount

      console.log(this.account)
      if (this.account) {
        this.isLogin = true
      }

      balance = await EosAgent.getCurrencyBalance('EOS')
      if (balance && balance.length > 0) {
        this.eosBalance = balance[0].split(' ')[0]
      } else {
        this.eosBalance = 0.0
      }
    }
  }

  login = async () => {
    let account = await EosAgent.loginWithScatter()

    console.log('debug')
    console.log(account)
    if (account) {
      this.account = account
      this.isLogin = true

      this.loadAccountInfo()
    }
  }

  logout = async () => {
    await EosAgent.logout()

    this.isLogin = false
    this.account = null
  }

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

  updateMyBlockProducers = newBlockProducers => {
    if (newBlockProducers) {
      this.myBlockProducers = newBlockProducers.sort()
    }
  }
}

decorate(AccountStore, {
  isLogin: observable,
  eosBalance: observable,
  accountInfo: observable,
  account: observable,
  myBlockProducers: observable,
  loadAccountInfo: action,
  login: action,
  logout: action,
  createNewAccount: action,
  updateMyBlockProducers: action
})

export default new AccountStore()
