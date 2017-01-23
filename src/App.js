import React, { Component } from 'react'
import Grid from './grid/Grid'
import PlaceholdImageItem from './grid/PlaceholderImageItem'
import TV from './TV/TV'


class App extends Component {
  componentWillMount() {
    this.getDimensions()
  }
  componentDidMount() {
    window.addEventListener('resize', this.getDimensions.bind(this), true)
  }
  getDimensions() {
    this.setState({
      width: Math.floor(window.innerWidth / 3.15)
    , height: 225
    })
  }
  render() {
    return (
      <Grid>
        <PlaceholdImageItem {...this.state}/>
        <TV {...this.state}/>
        <PlaceholdImageItem {...this.state}/>
        <PlaceholdImageItem {...this.state}/>
        <PlaceholdImageItem {...this.state}/>
        <PlaceholdImageItem {...this.state}/>
        <PlaceholdImageItem {...this.state}/>
        <PlaceholdImageItem {...this.state}/>
        <PlaceholdImageItem {...this.state}/>
        <PlaceholdImageItem {...this.state}/>
        <PlaceholdImageItem {...this.state}/>
        <PlaceholdImageItem {...this.state}/>
        <PlaceholdImageItem {...this.state}/>
        <PlaceholdImageItem {...this.state}/>
        <PlaceholdImageItem {...this.state}/>
        <PlaceholdImageItem {...this.state}/>
        <PlaceholdImageItem {...this.state}/>
        <PlaceholdImageItem {...this.state}/>
      </Grid>
    )
  }
}

export default App
