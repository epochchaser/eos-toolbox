import { observable, action, computed } from 'mobx'

export class LocaleStore {
  @observable lang = 'en'

  @action
  updateLocale(newlang) {
    this.lang = newlang
  }

  @computed
  get locale() {
    return this.lang
  }
}

export default new LocaleStore()
