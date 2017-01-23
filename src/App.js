import React, { Component } from 'react'
import { Grid, PlaceholderImageItem } from './grid'
import { TV } from './tv'


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
        <PlaceholderImageItem {...this.state}/>
        <TV {...this.state}/>
        <PlaceholderImageItem {...this.state}/>
        <PlaceholderImageItem {...this.state}/>
        <PlaceholderImageItem {...this.state}/>
        <PlaceholderImageItem {...this.state}/>
        <PlaceholderImageItem {...this.state}/>
        <PlaceholderImageItem {...this.state}/>
        <PlaceholderImageItem {...this.state}/>
        <PlaceholderImageItem {...this.state}/>
        <PlaceholderImageItem {...this.state}/>
        <PlaceholderImageItem {...this.state}/>
        <PlaceholderImageItem {...this.state}/>
        <PlaceholderImageItem {...this.state}/>
        <PlaceholderImageItem {...this.state}/>
        <PlaceholderImageItem {...this.state}/>
        <PlaceholderImageItem {...this.state}/>
        <PlaceholderImageItem {...this.state}/>
      </Grid>
    )
  }
}

export default App
