import { decorate, observable, action } from 'mobx'

export class CommonStore {
  isLoading = false
  _initilizedScatter = false

  setLoading = isLoading => {
    this.isLoading = isLoading
  }

  initScatter = isInit => {
    this._initilizedScatter = isInit
  }
}

decorate(CommonStore, {
  isLoading: observable,
  setLoading: action
})

export default new CommonStore()
