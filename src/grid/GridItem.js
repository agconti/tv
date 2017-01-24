import React from 'react'
import { greyGifFactory } from './fixtures'
import './ml.css'

export const GridItem = ({children}) => (
  <div className={"ml-pnl"}>
    {children}
  </div>
)

const GreyGif = () => (
  <video className={"ml-pnl__cntnt"}
           autoPlay
           loop
           preload
           src={greyGifFactory()}
           alt={"Placeholder"} />
)

export const GreyGifGridItem = () => (
  <GridItem>
    <GreyGif />
  </GridItem>
)

export const getDimensions = contianer => {
  const { clientWidth, clientHeight} = contianer
  return { width: clientWidth, height: clientHeight}
}
