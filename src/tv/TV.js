import React, { Component } from 'react'
import TVScreen from './TVScreen'
import './tv.css'


export default class TV extends Component {
  mediaUrl = 'https://media.giphy.com/media'
  rendition = 'giphy.mp4'
  unstarted = -1
  state = {
    assetIndex: this.unstarted
  }
  constructor(props){
    super(props)
    this.getAssetUrl = this.getAssetUrl
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
  getAssetUrl(resource) {
    return [this.mediaUrl, resource, this.rendition].join('/')
  }
  next() {
    this.setState((prevState, props) => {
      const { assets, updateActiveIndex } = props
      const { assetIndex } = prevState
      const nextAssetIndex = assetIndex + 1
      const src = this.getAssetUrl(assets[nextAssetIndex % assets.length])

      updateActiveIndex(nextAssetIndex)
      return {src, assetIndex: nextAssetIndex}
    })
  }
  render() {
    const { src } = this.state

    return (
      <div ref={el => this.container = el}
           className={'tv'}>
        <video ref={el => this.player = el}
               autoPlay
               crossOrigin={'anonymous'}
               src={src}></video>
      </div>
    )
  }
}
