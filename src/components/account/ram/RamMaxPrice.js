import React from 'react'
import { LinePath } from '@vx/shape'

const RamMaxPrice = ({ data, label, yText, yScale, xScale, x, y }) => {
  return (
    <g>
      <LinePath
        data={data}
        yScale={yScale}
        xScale={xScale}
        y={y}
        x={x}
        stroke="#6086d6"
        strokeWidth={1}
        strokeDasharray="4,4"
        strokeOpacity=".3"
      />
      <text fill="#4099ff" y={yText} dy="1.3em" dx="10px" fontSize="18">
        {label}
      </text>
    </g>
  )
}

export default RamMaxPrice
