import React, { Component } from 'react'
import { ImageGridItem } from './GridItem'
import TV from '../tv/TV'
import './ml.css'
import './grid.css'

class Grid extends Component {
  state = {
    activeIndex: 0
  }
  setSelectedItemIndex(activeIndex) {
    this.setState({activeIndex})
  }
  render() {
    const { items } = this.props
    const { activeIndex } = this.state
    const imageGridItems = items.map((id, index) => (
      <ImageGridItem id={id} key={index} index={index} activeIndex={activeIndex}/>
    ))
    const third = Math.floor(imageGridItems.length / 3)
    const left = imageGridItems.slice(0, third)
    const middle = imageGridItems.slice(third, third * 2)
    const right = imageGridItems.slice(third * 2)

    return (
      <section className={"grid"}>
        <div className={"grid-col"}>
          <div className={"ml"}>
            {left}
          </div>
        </div>
        <div className={"grid-col grid-col--hero"}>
          <div className="grid-item grid-item--hero">
            <TV updateActiveIndex={index => this.setSelectedItemIndex(index)}
                assets={items} />
          </div>
          <div className={'ml'}>
            {middle}
          </div>
        </div>
        <div className={"grid-col"}>
          <div className={"ml"}>
            {right}
          </div>
        </div>
      </section>
    )
  }
}

export default Grid
