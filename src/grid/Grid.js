import React from 'react'
import {GridItem} from './GridItem'
import {greyGifs} from './fixtures'
import TV from '../tv/TV'
import './ml.css'
import './grid.css'

const Grid = ({children}) => {
  const items = React.Children.toArray(children)
  const third = Math.floor(items.length / 3)
  const left = items.slice(0, third)
  const middle = items.slice(third, third * 2)
  const right = items.slice(third * 2)

  return (
    <section className={"grid"}>
      <div className={"grid-col"}>
        <div className={"ml"}>
          {left}
        </div>
      </div>
      <div className={"grid-col"}>
        <div className="grid-item--hero">
          <TV assets={greyGifs} />
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

export default Grid
