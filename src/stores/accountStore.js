import { observable, action } from "mobx"
import EosAgent from "../EosAgent"

export class AccountStore {
  @observable isLogin = false
  @observable balance = 0.0

  @action
  loadAccountInfo = () => {
    this.isLoading = true
  }

  @action
  login = async () => {
    let account = await EosAgent.loginWithScatter()

    if (account) {
      this.account = account
      this.isLogin = true
    }
  }

  @action
  logout = async () => {
    let result = await EosAgent.logout()

    this.isLogin = false
    this.account = null
  }
}

export default new AccountStore()
