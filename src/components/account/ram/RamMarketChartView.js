import React, { Component } from 'react'
import sizeMe from 'react-sizeme'
import '../../../styles/components/account/ram/RamMarketChartView.scss'
import { inject, observer } from '../../../../node_modules/mobx-react'
import { scaleTime, scaleLinear } from '@vx/scale'
import { Group } from '@vx/group'
import { extent, max, min } from 'd3-array'
import { AreaClosed } from '@vx/shape'
import { AxisLeft, AxisBottom } from '@vx/axis'
import { LinearGradient } from '@vx/gradient'

const margin = {
  top: 60,
  bottom: 60,
  left: 80,
  right: 80
}

@inject('eosioStore')
@observer
class RamMarketChartView extends Component {
  componentDidMount = () => {
    setInterval(this.fetchRamMarketInfo, 2000)
  }

  componentWillUnmount = () => {
    clearInterval(this.fetchRamMarketInfo)
  }

  fetchRamMarketInfo = () => {
    const { eosioStore } = this.props
    eosioStore.stackRamMarkets()
  }

  x = d => new Date(d.date)
  y = d => d.close

  render() {
    const { eosioStore, size } = this.props
    const { ramMarketHistory } = eosioStore

    if (!ramMarketHistory)
      return (
        <div className="preloader3 loader-block m-t-20 m-b-20" style={{ height: '9px' }}>
          <div className="circ1" />
          <div className="circ2" />
          <div className="circ3" />
          <div className="circ4" />
        </div>
      )

    const width = Math.floor(size.width)
    const height = 600

    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom
    ramMarketHistory.map(this.y)

    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(ramMarketHistory, this.x)
    })

    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [min(ramMarketHistory, this.y), max(ramMarketHistory, this.y)]
    })

    return (
      ramMarketHistory && (
        <div className="col-sm-12">
          <div className="row">
            <div className="card statustic-card">
              <div className="app">
                <div className="center">
                  <svg width={width} height={height}>
                    <Group top={margin.top} left={margin.left}>
                      <LinearGradient from="#64b0f2" to="#4099ff" id="gradient" />

                      <AxisLeft
                        scale={yScale}
                        top={0}
                        left={0}
                        label={'Close Price ($)'}
                        stroke={'#1b1a1e'}
                        tickTextFill={'#1b1a1e'}
                      />
                      <AxisBottom
                        scale={xScale}
                        top={yMax}
                        label={'Years'}
                        stroke={'#1b1a1e'}
                        tickTextFill={'#1b1a1e'}
                      />
                      <AreaClosed
                        data={ramMarketHistory}
                        xScale={xScale}
                        yScale={yScale}
                        x={this.x}
                        y={this.y}
                        fill={'url(#gradient)'}
                        stroke={''}
                      />
                    </Group>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    )
  }
}

export default sizeMe()(RamMarketChartView)
