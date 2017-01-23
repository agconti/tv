import React from 'react'
import './grid.css'

const MasonryGrid = props => (
  <section className={"grid"}>
    {props.children}
  </section>
)

export default MasonryGrid
