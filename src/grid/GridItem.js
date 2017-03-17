import React, { PureComponent } from 'react'
import './ml.css'
import './grid.css'

class GridItem extends PureComponent {
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  render() {
    const {className='', index, activeIndex, children} = this.props
    const active = index === activeIndex? `grid-item--active` : ''
    const activeClass = `ml-item grid-item ${className} ${active}`

    return (
      <div className={activeClass}>
        {children}
        <div className={'grid-item__overlay'}></div>
      </div>
    )
  }
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
