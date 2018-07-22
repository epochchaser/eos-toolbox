import React from 'react'
import { Tooltip } from '@vx/tooltip'

const RamTooltips = ({ yTop, yLeft, yLabel, xTop, xLeft, xLabel }) => {
  return (
    <div>
      <Tooltip
        top={xTop}
        left={xLeft}
        style={{
          transform: 'translateX(-50%)'
        }}
      >
        {xLabel}
      </Tooltip>
      <Tooltip
        top={yTop}
        left={yLeft}
        style={{
          backgroundColor: 'rgba(92, 119, 235, 1.000)',
          color: 'white'
        }}
      >
        {yLabel}
      </Tooltip>
    </div>
  )
}

export default RamTooltips
