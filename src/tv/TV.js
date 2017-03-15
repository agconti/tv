import React, { Component } from 'react'
import TVScreen from './TVScreen'
import './tv.css'



export default class TV extends Component {
  unstarted = -1
  state = {
    assetIndex: this.unstarted
  }
  constructor(props){
    super(props)
    this.getAsset = this.getAsset
    this.getAssetUrl = this.getAssetUrl
    this.rendition = 'giphy.mp4'
    this.mediaUrl = 'https://media.giphy.com/media'
  }
  componentWillMount() {
    this.next()
  }
  componentDidMount() {
    this.player.addEventListener('ended', () => this.next())
    this.screen = new TVScreen(this.container, this.player, this.container.clientWidth, this.container.clientHeight)
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
  getAssetUrl(resource) {
    return [this.mediaUrl, resource, this.rendition].join('/')
  }
  render() {
    const { assetSrc } = this.state

    return (
      <div ref={el => this.container = el}
           className={'tv'}>
        <video ref={el => this.player = el}
               autoPlay
               crossOrigin={'anonymous'}
               src={this.getAssetUrl(assetSrc)}></video>
      </div>
    )
  }
}
