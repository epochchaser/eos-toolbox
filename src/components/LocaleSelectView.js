import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import initLocale, { getUserLocale } from 'react-intl-locale'

@inject('accountStore', 'commonStore', 'localeStore')
@observer
class LocaleSelectView extends Component {
  constructor(props) {
    super(props)
    let { accountStore, commonStore } = this.props
    this.accountStore = accountStore
    this.commonStore = commonStore

    this.locales = ['ko-KR', 'en-US']
  }

  updateLocale = newLocale => {
    const { localeStore } = this.props
    localeStore.updateLocale(newLocale.split('-')[0])
  }

  render() {
    const { localeStore } = this.props

    return (
      <Fragment>
        <a href="#!">
          <span>{localeStore.locale}</span>
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
