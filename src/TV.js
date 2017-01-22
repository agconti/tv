import React, { Component } from 'react'
// import './demo'

const display = 'block'
const assetsType = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
const assets = [
  'video-1.mp4'
, 'video-2.mp4'
, 'video-3.mp4'
]

const sourceItem = (src, index) => (
  <source key={index} src={`${process.env.PUBLIC_URL}/${src}`} type={assetsType} />
)

export default class TV extends Component {
  render() {
    return (
      <video id={"video"} autoPlay loop style={{display}}>
        {assets.map(sourceItem)}
      </video>
    )
  }
}
