import React, { Component } from 'react'
import Grid from './Grid'
import PlaceholdImageItem from './PlaceholderImageItem'
import TV from './TV'

const getDimensions = () => ({
  width: window.innerWidth / 3
, height: 200
})


class App extends Component {
  render() {
    return (
      <Grid>
        <PlaceholdImageItem {...getDimensions()}/>
        <TV />
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
