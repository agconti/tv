import React, { Component } from 'react'
// import './demo'

const display = 'block'
const unstarted = -1

export default class TV extends Component {
  state = {
    assetIndex: unstarted,
    assets: [
      'video-1.mp4'
    , 'video-2.mp4'
    , 'video-3.mp4'
    ]
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
  }
  getAsset() {
    const {assets, assetIndex} = this.state
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
      <video ref={el => this.player = el}
             id={"video"}
             autoPlay
             style={{display}}
             src={assetSrc}>
      </video>
    )
  }
}
