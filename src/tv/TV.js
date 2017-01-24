import React, { Component } from 'react'
import './tv.css'
import '../grid/ml.css'
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
    const { width, height } = this.props

    this.player.addEventListener('ended', () => this.next())
    start(this.container, this.player, width, height)
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
    let { width, height } = this.props
    width *= 2
    height *= 2

    return (
      <div ref={el => this.container = el}
           className={'tv'}
           style={{width, height}}>
        <video ref={el => this.player = el}
               className={"ml-pnl__cntnt"}
               id={'video'}
               autoPlay
               style={{display}}
               src={assetSrc}>
        </video>
      </div>
    )
  }
}
