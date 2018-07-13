import { decorate, observable, action } from 'mobx'

export class CommonStore {
  isLoading = false

  setLoading(isLoading) {
    this.isLoading = isLoading
  }
}

decorate(CommonStore, {
  isLoading: observable,
  setLoading: action
})

export default new CommonStore()
