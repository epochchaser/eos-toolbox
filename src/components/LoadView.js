import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('commonStore')
@observer
class LoadView extends Component {
  constructor(props) {
    super(props)
    let { commonStore } = this.props
    this.commonStore = commonStore
  }

  render() {
    return (
      <div>
        {this.commonStore.isLoading && (
          <div className="theme-loader">
            <div className="loader-track">
              <div className="loader-bar" />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default LoadView
