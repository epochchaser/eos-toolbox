import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { IntlProvider, addLocaleData } from "react-intl"
import en from "react-intl/locale-data/en"
import ko from "react-intl/locale-data/ko"
import locale from "./locale/locale"
import { Provider } from "mobx-react"
import accountStore from "./stores/accountStore"

addLocaleData([...en, ...ko])

const defaultLang = "ko"
// const defaultLang = localStorage.getItem('lang') || 'en'

const stores = {
  accountStore
}

ReactDOM.render(
  <Provider {...stores}>
    <IntlProvider locale={defaultLang} messages={locale[defaultLang]}>
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById("root")
)
