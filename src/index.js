import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import ko from 'react-intl/locale-data/ko'
import locale from './locale/locale'
import { Provider } from 'mobx-react'
import accountStore from './stores/accountStore'
import localeStore from './stores/localeStore'
import commonStore from './stores/commonStore'
import initLocale, { getUserLocale } from 'react-intl-locale'

// param : defulat locale, allow locale array
initLocale('en-US', ['ko-KR'])
addLocaleData([...en, ...ko])

const userLocale = getUserLocale()
localeStore.updateLocale(userLocale.split('-')[0])

const stores = {
  accountStore,
  commonStore,
  localeStore
}

ReactDOM.render(
  <Provider {...stores}>
    <IntlProvider
      key={localeStore.locale}
      locale={localeStore.locale}
      messages={locale[localeStore.locale]}
    >
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
)

setTimeout(() => {
  accountStore.loadAccountInfo()
}, 1000)
