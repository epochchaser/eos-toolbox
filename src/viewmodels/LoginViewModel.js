import { observable, action } from "mobx"
import LoginModel from "../models/LoginModel"
import AppCommon from "../common/AppCommon"

export default class LoginViewModel {
  @observable model = new LoginModel()

  login = () => {
    const appCommon = new AppCommon()
    console.log(appCommon.setLogin())
    console.log(appCommon.isLoggedIn)
  }

  logout = () => {}
}
