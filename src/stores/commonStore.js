import { decorate, observable, action } from 'mobx'

export class CommonStore {
  isLoading = false
  _initilizedScatter = false
  _initilizedEos = false

  setLoading = isLoading => {
    this.isLoading = isLoading
  }

  initScatter = isInit => {
    this._initilizedScatter = isInit
  }

  initEos = isInit => {
    this._initilizedEos = isInit
  }
}

decorate(CommonStore, {
  isLoading: observable,
  _initilizedScatter: observable,
  _initilizedEos: observable,
  setLoading: action,
  initScatter: action,
  initEos: action
})

export default new CommonStore()
