import { observable, action } from "mobx"
import LoginModel from "../models/LoginModel"
import AppCommon, { getInstance } from "../common/AppCommon"

export default class LoginViewModel {
  @observable model = new LoginModel()

  login = () => {
    const appCommon = getInstance()
    console.log(appCommon.isLoggedIn)
  }

  logout = () => {}
}
