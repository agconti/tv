import * as THREE from 'three'
import RenderPass from './RenderPass'
import ShaderPass from './ShaderPass'
import FilmPass from './FilmPass'
import TexturePass from './TexturePass'
import VignetteShader from './VignetteShader'
import SepiaShader from './SepiaShader'
import TVShader from './TVShader'
import { EffectComposer } from './EffectComposer'


export default class TVScreen {
  constructor(container, video, initialWidth, initalHeight) {
    const containerWidth = initialWidth
    const containerHeight = initalHeight
    const containerHalfWidth = initialWidth / 2
    const containerHalfHeight = initalHeight / 2

    this.antialias = false
    this.clock = new THREE.Clock()
    this.scene = new THREE.Scene()

    // initalize scene
    this.texture = this.getVideoTexture(video)
    this.renderer = this.getRenderer(this.antialias, containerWidth, containerHeight)
    this.rendererDomElement = this.renderer.domElement
    this.tvGemometry = new THREE.PlaneBufferGeometry(containerWidth, containerHeight)
    this.tvMaterial = new THREE.MeshBasicMaterial({map: this.texture})
    this.tvMesh = new THREE.Mesh(this.tvGemometry, this.tvMaterial)
    this.scene.add(this.tvMesh)

    this.camera = new THREE.OrthographicCamera(-containerHalfWidth, containerHalfWidth, containerHalfHeight, -containerHalfHeight, 1, 10000 )
    this.camera.position.z = 1
    this.camera.lookAt(this.tvMesh.position)

    // postprocessing
    const renderScene = new TexturePass(this.texture)
    const renderModel = new RenderPass(this.scene, this.camera)
    this.composer = new EffectComposer(this.renderer)
    this.effectTV = new ShaderPass(TVShader)

    renderScene.uniforms.tDiffuse.value = this.texture
    this.effectTV.uniforms.time.value = this.getTimePassed()
    this.effectTV.uniforms.resolution.value = new THREE.Vector2(containerWidth, containerHeight)
    this.effectTV.renderToScreen = true

    this.composer.addPass(renderModel)
    this.composer.addPass(renderScene)
    this.composer.addPass(this.effectTV)

    container.appendChild(this.rendererDomElement)
    this.animate()
    window.addEventListener('resize', this.onWindowResize.bind(this))
  }

  getVideoTexture(video) {
    const texture = new THREE.VideoTexture(video)

    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.format = THREE.RGBFormat
    return texture
  }

  getRenderer(antialias, containerWidth, containerHeight) {
   const renderer = new THREE.WebGLRenderer({antialias})
   renderer.setPixelRatio(window.devicePixelRatio)
   renderer.setSize(containerWidth, containerHeight)
   renderer.autoClear = false
   return renderer
  }

  getTimePassed() {
    return this.clock.getDelta()
  }

  onWindowResize() {
    const {width, height} = this.rendererDomElement

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(width, height)
    this.composer.reset()
  }
  animate() {
    const { renderer, composer, effectTV} = this
    const getTimePassed = () => this.getTimePassed()

    ;(function animationLoop() {
      requestAnimationFrame(animationLoop)
      renderer.clear()
      composer.render()
      effectTV.uniforms.time.value += getTimePassed()
    })()

  }
}
