import { decorate, observable, action } from 'mobx'
import EosAgent from '../EosAgent'

export class AccountStore {
  isLogin = false
  eosBalance = 0.0
  totalBalance = 0.0
  staked = 0.0
  cpu_staked = 0.0
  cpu_max = 0.0
  net_staked = 0.0
  net_max = 0.0
  liquid = 0.0
  is_proxy = 0
  accountInfo = null
  account = null
  myBlockProducers = null

  loadAccountInfo = async () => {
    let accountInfo, balance

    accountInfo = await EosAgent.getAccountInfo()

    if (accountInfo) {
      this.liquid = parseFloat(accountInfo.core_liquid_balance.split(' ')[0])
      this.cpu_max = parseFloat(accountInfo.cpu_limit.max / 10000)
      this.net_max = parseFloat(accountInfo.net_limit.max / 10000)
      let refunding_cpu_amount = 0.0
      let refunding_net_amount = 0.0

      if (accountInfo.refund_request) {
        refunding_cpu_amount = parseFloat(accountInfo.refund_request.cpu_amount.split(' ')[0])
        refunding_net_amount = parseFloat(accountInfo.refund_request.net_amount.split(' ')[0])
      }

      this.net_staked = parseFloat(accountInfo.total_resources.net_weight.split(' ')[0])
      this.cpu_staked = parseFloat(accountInfo.total_resources.cpu_weight.split(' ')[0])

      this.staked = parseFloat(accountInfo.voter_info.staked) / 10000
      this.totalBalance =
        this.net_staked + this.cpu_staked + refunding_cpu_amount + refunding_net_amount
      const myProducers = Object.keys(accountInfo.voter_info.producers).map(k => {
        return accountInfo.voter_info.producers[k]
      })

      this.myBlockProducers = myProducers.sort()
      this.account = EosAgent.loginaccount

      console.log(EosAgent.loginaccount)
      if (this.account) {
        this.isLogin = true
      }

      balance = await EosAgent.getCurrencyBalance('EOS')
      if (balance && balance.length > 0) {
        this.eosBalance = balance[0].split(' ')[0]
      } else {
        this.eosBalance = 0.0
      }

      this.is_proxy = accountInfo.voter_info.is_proxy
      this.accountInfo = accountInfo
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

  updateMyBlockProducers = (name, include) => {
    if (!this.myBlockProducers) return
    let filterBaseBPList = this.myBlockProducers.filter(bp => bp !== name)

    if (include) {
      filterBaseBPList = filterBaseBPList.concat(name)
    }

    this.myBlockProducers = filterBaseBPList.sort()
  }
}

decorate(AccountStore, {
  isLogin: observable,
  eosBalance: observable,
  totalBalance: observable,
  staked: observable,
  cpu_staked: observable,
  net_staked: observable,
  cpu_max: observable,
  net_max: observable,
  liquid: observable,
  is_proxy: observable,
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
