import { observable, computed, action } from "mobx"

export default class AppCommon {
  static instance
  @observable login = false

  static go() {
    console.log("byte")
  }

  @computed
  get isLoggedIn() {
    return this.login
  }

  @action
  setLogin = () => {
    this.login = !this.login
  }
}
