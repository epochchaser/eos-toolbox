import { decorate, observable, action, computed } from 'mobx'

export class LocaleStore {
  lang = 'en'

  updateLocale(newlang) {
    this.lang = newlang
  }

  get locale() {
    return this.lang
  }
}

decorate(LocaleStore, {
  lang: observable,
  updateLocale: action,
  locale: computed
})

export default new LocaleStore()
