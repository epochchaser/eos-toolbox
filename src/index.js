import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import ko from 'react-intl/locale-data/ko'
import locale from './locale/locale'
import { Provider } from 'mobx-react'
import accountStore from './stores/accountStore'
import commonStore from './stores/commonStore'
import eosioStore from './stores/eosioStore'
import initLocale, { getUserLocale } from 'react-intl-locale'
import EosAgent from './EosAgent'
import * as Utils from './utils/Utils'
import * as Values from './constants/Values'

// param : defulat locale, allow locale array
initLocale('en-US', Values.supportLanguage.slice())
addLocaleData([...en, ...ko])

const lang = Utils.getJsonFromUrl().lang

console.log(lang)

let i18nLang

if (lang) {
  i18nLang = lang.split('-')[0]
  localStorage.setItem('locale', lang)
} else {
  const savedLocale = localStorage.getItem('locale')

  if (savedLocale) {
    i18nLang = savedLocale.split('-')[0]
  } else {
    const userLocale = getUserLocale()
    i18nLang = userLocale.split('-')[0]
  }
}

const stores = {
  accountStore,
  commonStore,
  eosioStore
}

document.addEventListener('scatterLoaded', scatterExtension => {
  console.log('scatterloaded')

  if (window.scatter) {
    EosAgent.initScatter(window.scatter)
    commonStore.initScatter(true)

    if (window.scatter.identity) {
      EosAgent.initEosAgent(window.scatter.identity)
      commonStore.initEos(true)
      accountStore.loadAccountInfo()
    }
  }
})

ReactDOM.render(
  <Provider {...stores}>
    <IntlProvider key={i18nLang} locale={i18nLang} messages={locale[i18nLang]}>
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
)
