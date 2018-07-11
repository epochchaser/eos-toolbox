import { observable, computed, action } from "mobx"

let instance

export default class AppCommon {
  @observable login = false

  @computed
  get isLoggedIn() {
    return this.login
  }

  @action
  setLogin = () => {
    this.login = !this.login
  }
}

export function getInstance() {
  return instance ? instance : new AppCommon()
}
