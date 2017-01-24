import React, { Component } from 'react'
import { Grid, PlaceholderItem,  tvGifs, greyGifFactory} from './grid'
import { TV } from './tv'

class App extends Component {
  componentWillMount() {
    this.getDimensions()
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.getDimensions.bind(this))
  }
  componentDidMount() {
    window.addEventListener('resize', this.getDimensions.bind(this))
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
        <PlaceholderItem {...this.state}/>
        <TV assets={tvGifs} {...this.state}/>
        <PlaceholderItem {...this.state}/>
        <PlaceholderItem {...this.state}/>
        <PlaceholderItem {...this.state}/>
        <PlaceholderItem {...this.state}/>
        <PlaceholderItem {...this.state}/>
        <PlaceholderItem {...this.state}/>
        <PlaceholderItem {...this.state}/>
        <PlaceholderItem {...this.state}/>
        <PlaceholderItem {...this.state}/>
        <PlaceholderItem {...this.state}/>
        <PlaceholderItem {...this.state}/>
        <PlaceholderItem {...this.state}/>
        <PlaceholderItem {...this.state}/>
        <PlaceholderItem {...this.state}/>
        <PlaceholderItem {...this.state}/>
        <PlaceholderItem {...this.state}/>
      </Grid>
    )
  }
}

export default App
