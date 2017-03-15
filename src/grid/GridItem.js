import React from 'react'
import { greyGifFactory } from './fixtures'
import './ml.css'

export const GridItem = ({className='', children}) => (
  <div className={`ml-item grid-item ${className}`}>
    {children}
  </div>
)

const GreyGif = () => {
  const rendition = '200.webp'
  const resource = greyGifFactory()
  const url = [resource, rendition].join('/')

  return <img src={url}
              alt={'Placeholder'} />
}

export const GreyGifGridItem = () => (
  <GridItem>
    <GreyGif />
  </GridItem>
)

export const getDimensions = contianer => {
  const { clientWidth, clientHeight} = contianer
  return { width: clientWidth, height: clientHeight}
}
