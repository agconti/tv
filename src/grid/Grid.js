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
      <div className={"ml grid-col"}>{left}</div>
      <div className={"ml grid-col"}>
        <div>
          <GridItem>
            <TV assets={greyGifs}/>
          </GridItem>
          <div className={'ml'}>
            {middle}
          </div>
        </div>
      </div>
      <div className={"ml grid-col"}>{right}</div>
    </section>
  )
}

export default Grid
