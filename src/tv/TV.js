import React, { Component } from 'react'
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
    this.player.addEventListener('ended', () => this.next())
    start(this.container, this.player, this.container.clientWidth, this.container.clientHeight)
  }
  componentWillUnmount() {
    this.player.removeEventListener('ended', () => this.next())
  }
  getAsset() {
    const { assets } = this.props
    const { assetIndex } = this.state
    const nextAssetIndex = assetIndex + 1
    const assetSrc = assets[nextAssetIndex % assets.length]
    return {assetSrc, assetIndex: nextAssetIndex}
  }
  next() {
    this.setState(this.getAsset())
  }
  render() {
    const { assetSrc } = this.state

    return (
      <div ref={el => this.container = el}
           className={'tv'}>
        <video ref={el => this.player = el}
               autoPlay
               crossOrigin={'anonymous'}
               style={{display}}
               src={assetSrc}>
        </video>
      </div>
    )
  }
}
