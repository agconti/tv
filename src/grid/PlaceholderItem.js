import React from 'react'
import { greyGifFactory } from './fixtures'
import './ml.css'

const PlaceholderItem = () => (
  <div className={"ml-pnl"}>
    <video className={"ml-pnl__cntnt"}
           autoPlay
           loop
           preload
           src={greyGifFactory()}
           alt={"Placeholder"} />
  </div>
)

export const getDimensions = contianer => {
  const { clientWidth, clientHeight} = contianer
  return { width: clientWidth, height: clientHeight}
}

export default PlaceholderItem
