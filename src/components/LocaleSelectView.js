import React, { Component, Fragment } from 'react'
import * as Values from '../constants/Values'
import * as Utils from '../utils/Utils'

class LocaleSelectView extends Component {
  constructor(props) {
    super(props)

    this.locales = Values.supportLanguage.slice()
    this.selectedLocale = localStorage.getItem('locale')
  }

  render() {
    let location = window.location.pathname
    let params = Utils.getJsonFromUrl()

    return (
      <Fragment>
        <a href="#!">
          <span>{this.selectedLocale}</span>
          <i className="ti-angle-down" />
        </a>
        <ul className="show-notification profile-notification" style={{ width: '120px' }}>
          <div>
            {this.locales.map(locale => {
              params['lang'] = locale
              return (
                <li key={locale}>
                  <a href={location + '?' + Utils.getUrlFromJson(params)}>
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
