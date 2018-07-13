import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import localeStore from '../stores/localeStore'
import initLocale, { getUserLocale } from 'react-intl-locale'

@inject('accountStore', 'commonStore')
@observer
class LocaleSelectView extends Component {
  constructor(props) {
    super(props)
    let { accountStore, commonStore } = this.props
    this.accountStore = accountStore
    this.commonStore = commonStore

    this.locales = ['ko-KR', 'en-US']
    this.currentLocale = localeStore.locale
  }

  updateLocale = newLocale => {
    console.log(newLocale)
    localeStore.updateLocale(newLocale.split('-')[0])
  }

  render() {
    return (
      <Fragment>
        <a href="#!">
          {!this.accountStore.isLogin && <span>{this.currentLocale}</span>}
          <i className="ti-angle-down" />
        </a>
        <ul className="show-notification profile-notification">
          <div>
            {this.locales.map(locale => {
              return (
                <li key={locale}>
                  <a href="#!" onClick={() => this.updateLocale(locale)}>
                    <i className="ti-user" /> {locale}
                  </a>
                </li>
              )
            })}
          </div>
        </ul>
      </Fragment>
    )
  }
}

export default LocaleSelectView
