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
}

export default new AccountStore()
