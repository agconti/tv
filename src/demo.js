import * as THREE from 'three'
import RenderPass from './RenderPass'
import ShaderPass from './ShaderPass'
import FilmPass from './FilmPass'
import TexturePass from './TexturePass'
import VignetteShader from './VignetteShader'
import SepiaShader from './SepiaShader'
import ChromaticalShader from './ChromaticalShader'
import { EffectComposer } from './EffectComposer'


const antialias = false

function init(container, video, containerWidth, containerHeight, windowHalfX, windowHalfY) {
  const clock = new THREE.Clock()
  const scene = new THREE.Scene()

  const renderer = new THREE.WebGLRenderer({antialias})
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(containerWidth, containerHeight)
  renderer.autoClear = false

  container.appendChild(renderer.domElement)

  const texture = new THREE.VideoTexture(video)
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.format = THREE.RGBFormat

  const tvGemometry = new THREE.PlaneBufferGeometry(containerWidth, containerHeight)
  const tvMaterial = new THREE.MeshBasicMaterial({map: texture})
  const tvMesh = new THREE.Mesh(tvGemometry, tvMaterial)
  scene.add(tvMesh)

  const camera = new THREE.OrthographicCamera(-windowHalfX, windowHalfX, windowHalfY, -windowHalfY, 1, 10000 )
  camera.position.z = 1
  camera.lookAt(tvMesh.position)


  // postprocessing
  var renderModel = new RenderPass(scene, camera)
  var effectChromatical = new ShaderPass(ChromaticalShader)
  var effectSepia = new ShaderPass(SepiaShader)
  var effectFilm = new FilmPass(0.25, 0.15, 4096, false)
  var effectVignette = new ShaderPass(VignetteShader)
  effectChromatical.uniforms.time.value += clock.getDelta()
  effectSepia.uniforms[ "amount" ].value = 0.4
  effectVignette.uniforms[ "offset" ].value = 0.95
  effectVignette.uniforms[ "darkness" ].value = 0.9

  // effectFilm.renderToScreen = true
  effectVignette.renderToScreen = true
  // effectChromatical.renderToScreen = true

  const composer = new EffectComposer( renderer )
  const renderScene = new TexturePass( texture )
  composer.addPass( renderModel )
  composer.addPass( renderScene )
  // composer.addPass( effectChromatical )
  composer.addPass( effectSepia )
  composer.addPass( effectFilm )
  composer.addPass( effectVignette )

  renderScene.uniforms[ "tDiffuse" ].value = texture
  return {renderer, composer, camera}
}

function onWindowResize(renderer, composer, camera, containerWidth, containerHeight) {
  // windowHalfX = containerWidth / 2
  // windowHalfY = containerHeight / 2

  camera.aspect = containerWidth / containerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(containerWidth, containerHeight)
  composer.reset()
}

const start = (container, video) => {
  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight
  const windowHalfX = containerWidth / 2
  const windowHalfY = containerHeight / 2

  const {renderer, composer, camera} = init(container, video, containerWidth, containerHeight, windowHalfX, windowHalfY)
  window.addEventListener('resize', () => onWindowResize(renderer, composer, camera, container.innerWidth, container.innerHeight))

  ;(function animloop(){
    requestAnimationFrame(animloop)

    // if (video.readyState === video.HAVE_ENOUGH_DATA) {
    //   videoImageContext.drawImage(video, 0, 0 )
    //   if ( videoTexture ) {
    //     videoTexture.needsUpdate = true;
    //   }
    // }
    renderer.clear()
    composer.render()
  })()
}

export default start
