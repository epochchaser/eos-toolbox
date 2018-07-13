import { observable, action } from 'mobx'

export class CommonStore {
  @observable isLoading = false

  @action
  setLoading(isLoading) {
    this.isLoading = isLoading
  }
}

export default new CommonStore()
