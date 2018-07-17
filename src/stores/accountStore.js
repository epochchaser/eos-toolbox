import { decorate, observable, action } from 'mobx'
import EosAgent from '../EosAgent'

export class AccountStore {
  isLogin = false
  eosBalance = 0.0
  totalBalance = 0.0
  staked = 0.0
  accountInfo = null
  account = null
  myBlockProducers = null

  loadAccountInfo = async () => {
    let accountInfo, balance

    accountInfo = await EosAgent.getAccountInfo()

    if (accountInfo) {
      this.accountInfo = accountInfo

      let refunding_cpu_amount = 0.0
      let refunding_net_amount = 0.0

      if (accountInfo.refund_request) {
        refunding_cpu_amount = parseFloat(accountInfo.refund_request.cpu_amount.split(' ')[0])
        refunding_net_amount = parseFloat(accountInfo.refund_request.net_amount.split(' ')[0])
      }

      const net_weight = parseFloat(accountInfo.total_resources.net_weight.split(' ')[0])
      const cpu_weight = parseFloat(accountInfo.total_resources.cpu_weight.split(' ')[0])

      this.staked = parseFloat(accountInfo.voter_info.staked) / 10000
      this.totalBalance = net_weight + cpu_weight + refunding_cpu_amount + refunding_net_amount
      const myProducers = Object.keys(accountInfo.voter_info.producers).map(k => {
        return accountInfo.voter_info.producers[k]
      })

      this.myBlockProducers = myProducers.sort()
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
  totalBalance: observable,
  staked: observable,
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
