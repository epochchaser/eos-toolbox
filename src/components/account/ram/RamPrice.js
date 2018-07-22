import React from 'react'
import Chart from './RamChart'
import FormatPrice from '../../../utils/FormatPrice'
import '../../../styles/components/account/ram/RamPrice.scss'

const RamPrice = ({ data = {}, width, height }) => {
  if (!data.bpi) return <div>loading...</div>

  const prices = Object.keys(data.bpi).map(k => ({
    time: k,
    price: data.bpi[k]
  }))

  const currentPrice = prices[prices.length - 1].price
  const firstPrice = prices[0].price
  const diffPrice = currentPrice - firstPrice
  const hasIncreased = diffPrice > 0

  return (
    <div className="ram">
      <div className="title">
        <div>
          <big> Ram Price</big>
          <br />
          <small>last 30 days</small>
        </div>
        <div className="spacer" />
        <div className="stats">
          <div className="current">{FormatPrice(currentPrice)}</div>
          <div className={hasIncreased ? 'diffIncrease' : 'diffDecrease'}>
            {hasIncreased ? '+' : '-'}
            {FormatPrice(diffPrice)}
          </div>
        </div>
      </div>
      <div className="chart">
        <Chart
          data={prices}
          parentWidth={width}
          parentHeight={height}
          margin={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 45
          }}
        />
      </div>
    </div>
  )
}

export default RamPrice
