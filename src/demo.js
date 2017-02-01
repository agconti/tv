import * as THREE from 'three'
import RenderPass from './RenderPass'
import ShaderPass from './ShaderPass'
import FilmPass from './FilmPass'
import TexturePass from './TexturePass'
import VignetteShader from './VignetteShader'
import SepiaShader from './SepiaShader'
import TVShader from './TVShader'
import { EffectComposer } from './EffectComposer'


const antialias = false

function init(container, video, containerWidth, containerHeight, containerHalfWidth, containerHalfHeight) {
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

  const camera = new THREE.OrthographicCamera(-containerHalfWidth, containerHalfWidth, containerHalfHeight, -containerHalfHeight, 1, 10000 )
  camera.position.z = 1
  camera.lookAt(tvMesh.position)


  // postprocessing
  const renderModel = new RenderPass(scene, camera)
  const composer = new EffectComposer(renderer)
  const renderScene = new TexturePass(texture)
  const effectTV = new ShaderPass(TVShader)
  const timePassed = () => clock.getDelta()
  console.log(timePassed())
  renderScene.uniforms.tDiffuse.value = texture
  effectTV.uniforms.time.value += timePassed()
  effectTV.uniforms.resolution.value = new THREE.Vector2(containerWidth, containerHeight)
  effectTV.renderToScreen = true

  composer.addPass(renderModel)
  composer.addPass(renderScene)
  composer.addPass(effectTV)

  return {renderer, composer, camera}
}

function onWindowResize(renderer, composer, camera, containerWidth, containerHeight) {
  // containerHalfWidth = containerWidth / 2
  // containerHalfHeight = containerHeight / 2

  camera.aspect = containerWidth / containerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(containerWidth, containerHeight)
  composer.reset()
}

const start = (container, video, width, height) => {
  const containerHalfWidth = width / 2
  const containerHalfHeight = height / 2

  const {renderer, composer, camera} = init(container, video, width, height, containerHalfWidth, containerHalfHeight)
  window.addEventListener('resize', () => onWindowResize(renderer, composer, camera, container.clientWidth, container.clientHeight))

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
    effectTV.uniforms.time.value += timePassed()
  })()
}

export default start
