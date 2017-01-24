import React from 'react'
import './grid.css'

const PlaceholderImageItem = ({width, height}) => (
  <div className={"grid-item"}>
    <img src={`http://placehold.it/${width}x${height}`} alt={"Placeholder"} />
  </div>
)

export const getDimensions = contianer => {
  const { clientWidth, clientHeight} = contianer
  return { width: clientWidth, height: clientHeight}
}

export default PlaceholderImageItem
