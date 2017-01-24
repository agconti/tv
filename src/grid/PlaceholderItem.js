import React from 'react'
import { greyGifFactory } from './fixtures'
import './grid.css'

const PlaceholderItem = ({width, height}) => (
  <div className={"grid-item"} style={{width, height}}>
    <video autoPlay loop src={greyGifFactory()} alt={"Placeholder"} />
  </div>
)

export const getDimensions = contianer => {
  const { clientWidth, clientHeight} = contianer
  return { width: clientWidth, height: clientHeight}
}

export default PlaceholderItem
