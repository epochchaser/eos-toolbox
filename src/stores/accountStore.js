import { observable, action } from "mobx"
import EosAgent from "../EosAgent"

export class AccountStore {
  @observable isLogin = false
  @observable balance = 0.0
  @observable accountInfo = null;

  @action
  loadAccountInfo = async () => {
    let account = await EosAgent.getAccountInfo();
    this.accountInfo = account;
  }

  @action
  login = async () => {
    let account = await EosAgent.loginWithScatter()

    if (account) {
      this.account = account
      this.isLogin = true

      this.loadAccountInfo();
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
