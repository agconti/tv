import React, { Component } from 'react'
import Grid from './Grid'
import PlaceholdImageItem from './PlaceholderImageItem'
import TV from './TV'

const getDimensions = () => ({
  width: Math.floor(window.innerWidth / 3.15)
, height: 225
})


class App extends Component {
  render() {
    return (
      <Grid>
        <PlaceholdImageItem {...getDimensions()}/>
        <TV {...getDimensions()}/>
        <PlaceholdImageItem {...getDimensions()}/>
        <PlaceholdImageItem {...getDimensions()}/>
        <PlaceholdImageItem {...getDimensions()}/>
        <PlaceholdImageItem {...getDimensions()}/>
        <PlaceholdImageItem {...getDimensions()}/>
        <PlaceholdImageItem {...getDimensions()}/>
        <PlaceholdImageItem {...getDimensions()}/>
        <PlaceholdImageItem {...getDimensions()}/>
        <PlaceholdImageItem {...getDimensions()}/>
        <PlaceholdImageItem {...getDimensions()}/>
        <PlaceholdImageItem {...getDimensions()}/>
        <PlaceholdImageItem {...getDimensions()}/>
        <PlaceholdImageItem {...getDimensions()}/>
        <PlaceholdImageItem {...getDimensions()}/>
        <PlaceholdImageItem {...getDimensions()}/>
        <PlaceholdImageItem {...getDimensions()}/>
      </Grid>
    )
  }
}

export default App
