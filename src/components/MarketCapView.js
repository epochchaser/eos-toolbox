import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('commonStore')
@observer
class MarketCapView extends Component {
  constructor(props) {
    super(props)
    let { commonStore } = this.props
    this.commonStore = commonStore
  }

  componentDidMount() {
    this.commonStore.getCoinMarketCap()
  }

  render() {
    return <div />
  }
}

export default MarketCapView
