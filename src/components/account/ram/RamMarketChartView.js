import React, { Component } from 'react'
import sizeMe from 'react-sizeme'
import '../../../styles/components/account/ram/RamMarketChartView.scss'
import { inject } from '../../../../node_modules/mobx-react'

@inject('eosioStore')
class RamMarketChartView extends Component {
  constructor(props) {
    super(props)
    const { eosioStore } = this.props
    this.eosioStore = eosioStore
  }

  componentDidMount = () => {
    setInterval(this.fetchRamMarketInfo, 3000)
  }

  componentWillUnmount = () => {
    clearInterval(this.fetchRamMarketInfo)
  }

  fetchRamMarketInfo = () => {
    this.eosioStore.stackRamMarkets()
  }

  render() {
    const { size } = this.props
    const { ramMarketHistory } = this.eosioStore
    const width = Math.floor(size.width)

    console.log('그려 안그러ㅕ')
    return (
      ramMarketHistory && (
        <div className="col-sm-12">
          <div className="row">
            <div className="card statustic-card">
              <div className="app">
                <div className="center" />
              </div>
            </div>
          </div>
        </div>
      )
    )
  }
}

export default sizeMe()(RamMarketChartView)
