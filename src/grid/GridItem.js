import React from 'react'
import './ml.css'
import './grid.css'

export const GridItem = ({className='', index, activeIndex, children}) => {
  const active = index === activeIndex? `grid-item--active` : ''
  className = `ml-item grid-item ${className} ${active}`

  return (
    <div className={className}>
      <div className={'grid-item__overlay'}></div>
      {children}
    </div>
  )
}

const Image = ({id}) => {
  const rendition = '200.webp'
  const resource = 'https://media.giphy.com/media'
  const url = [resource, id, rendition].join('/')

  return <img src={url}
              alt={'Placeholder'} />
}

export const ImageGridItem = ({id, index, activeIndex}) => {
  return (
    <GridItem index={index} activeIndex={activeIndex}>
      <Image id={id}/>
    </GridItem>
  )
}
