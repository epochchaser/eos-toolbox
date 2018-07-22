import React from 'react'

const Background = ({ width, height }) => {
  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} />
    </svg>
  )
}

export default Background
