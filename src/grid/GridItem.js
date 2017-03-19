import React, { PureComponent } from 'react'
import './ml.css'
import './grid.css'

class GridItem extends PureComponent {
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  render() {
    const {className='', isActive, children} = this.props
    const active = isActive? `grid-item--active` : ''
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

export const ImageGridItem = ({id, isActive}) => {
  return (
    <GridItem isActive={isActive}>
      <Image id={id}/>
    </GridItem>
  )
}
