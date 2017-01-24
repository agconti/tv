import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { GridItem } from '../grid'
import './tv.css'
import start from '../demo'

const display = 'none'
const unstarted = -1

export default class TV extends Component {
  state = {
    assetIndex: unstarted
  }
  constructor(props){
    super(props)
    this.getAsset = this.getAsset
  }
  componentWillMount() {
    this.next()
  }
  componentDidMount() {
    const container = ReactDOM.findDOMNode(this.container)
    const { clientWidth } = container
    this.player.addEventListener('ended', () => this.next())
    start(container, this.player, clientWidth *2, clientWidth)
  }
  componentWillUnmount() {
    this.player.removeEventListener('ended', () => this.next())
  }
  getAsset() {
    const { assets } = this.props
    const { assetIndex } = this.state
    const nextAssetIndex = assetIndex + 1
    const assetSrc = `${process.env.PUBLIC_URL}/${assets[nextAssetIndex % assets.length]}`
    return {assetSrc, assetIndex: nextAssetIndex}
  }
  next() {
    this.setState(this.getAsset())
  }
  render() {
    const { assetSrc } = this.state

    return (
      <GridItem ref={comp => this.container = comp}
           className={'tv'}>
        <video ref={el => this.player = el}
               autoPlay
               style={{display}}
               src={assetSrc}>
        </video>
      </GridItem>
    )
  }
}
