import React, { Component } from 'react'
import { Grid, GridItem, GreyGifGridItem,  greyGifs, greyGifFactory} from './grid'
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
      width: Math.floor(window.innerWidth / 4.15)
    , height: 225
    })
  }
  render() {
    return (
      <Grid>
        <GreyGifGridItem />
        <GreyGifGridItem />
        <GreyGifGridItem />
        <GridItem>
          <TV assets={greyGifs}/>
        </GridItem>
        <GreyGifGridItem />
        <GreyGifGridItem />
        <GreyGifGridItem />
        <GreyGifGridItem />
        <GreyGifGridItem />
        <GreyGifGridItem />
        <GreyGifGridItem />
        <GreyGifGridItem />
        <GreyGifGridItem />
      </Grid>
    )
  }
}

export default App
