import React from 'react'
import { greyGifFactory } from './fixtures'
import './ml.css'

export const GridItem = ({className='', children}) => (
  <div className={`ml-item grid-item ${className}`}>
    {children}
  </div>
)

const GreyGif = () => (
  <img src={greyGifFactory()}
       alt={'Placeholder'} />
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
