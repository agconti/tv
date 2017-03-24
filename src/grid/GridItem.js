import React, { PureComponent } from 'react'
import './ml.css'
import './grid.css'

export class GridItem extends PureComponent {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.isActive !== this.props.isActive
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
  const resource = `https://media.giphy.com/media/${id}`

  return <img srcSet={`${resource}/200w.gif 200w, ${resource}/200.webp 200w`}
              sizes={"(max-width: 320px) 290px, (min-width: 321px) 200px"}
              src={`${resource}/200.webp`}
              alt={"Oh man, this gif is awesome."} />
}

export const ImageGridItem = ({id, isActive}) => {
  return (
    <GridItem isActive={isActive}>
      <Image id={id}/>
    </GridItem>
  )
}
