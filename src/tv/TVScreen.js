import * as THREE from 'three'
import RenderPass from './post_processing/RenderPass'
import ShaderPass from './post_processing/ShaderPass'
import TexturePass from './post_processing/TexturePass'
import { EffectComposer } from './post_processing/EffectComposer'
import TVShader from './TVShader'


export default class TVScreen {
  constructor(container, video) {
    const {clientWidth, clientHeight} = container
    console.log(clientWidth, clientHeight)
    const clientHalfWidth = clientWidth / 2
    const clientHalfHeight = clientHeight / 2
    this.antialias = true
    this.video = video
    this.clock = new THREE.Clock()
    this.scene = new THREE.Scene()
    this.container =  container
    this.devicePixelRatio = 1
    // this.devicePixelRatio = window.devicePixelRatio ? window.devicePixelRatio: 1

    // initalize scene
    this.texture = this.getVideoTexture(video)
    this.renderer = this.getRenderer(this.antialias, clientWidth, clientHeight)
    this.tvGemometry = new THREE.PlaneBufferGeometry(clientWidth, clientHeight)
    this.tvMaterial = new THREE.MeshBasicMaterial({map: this.texture})
    this.tvMesh = new THREE.Mesh(this.tvGemometry, this.tvMaterial)
    this.scene.add(this.tvMesh)

    this.camera = new THREE.OrthographicCamera(-clientHalfHeight, clientHalfHeight,
                                                clientHalfWidth, -clientHalfWidth, 1, 10000)
    this.camera.position.z = 1
    this.camera.lookAt(this.tvMesh.position)

    // postprocessing
    const renderScene = new TexturePass(this.texture)
    const renderModel = new RenderPass(this.scene, this.camera)
    this.composer = new EffectComposer(this.renderer)
    this.effectTV = new ShaderPass(TVShader)

    renderScene.uniforms.tDiffuse.value = this.texture
    this.effectTV.uniforms.time.value = this.getTimePassed()
    this.effectTV.uniforms.resolution.value = new THREE.Vector2(clientWidth, clientHeight)
    this.effectTV.renderToScreen = true

    this.composer.addPass(renderModel)
    this.composer.addPass(renderScene)
    this.composer.addPass(this.effectTV)

    container.appendChild(this.renderer.domElement)
    this.animate()
    window.addEventListener('resize', this.onWindowResize.bind(this), false)
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
   renderer.setPixelRatio(this.devicePixelRatio)
   renderer.setSize(containerWidth, containerHeight)
   renderer.autoClear = false
   return renderer
  }

  getTimePassed() {
    return this.clock.getDelta()
  }

  resize() {
    const {clientWidth, clientHeight} = this.container
    this.camera.left = clientWidth / - 2
    this.camera.right =  clientWidth / 2
    this.camera.top = clientHeight / 2
    this.camera.bottom = clientHeight / - 2
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(clientWidth, clientHeight)
    this.texture.needsUpdate = true
    function check (obj, w, h) {
      const {clientWidth, clientHeight} = obj
      console.log(w - clientWidth, h - clientHeight)
     }
    check(this.video, clientWidth, clientHeight)
    this.composer.reset()
  }
  onWindowResize() {
    const resize = this.resize.bind(this)
    const debounceThreshold = 250

    clearTimeout(this.resizeTimeout)
    this.resizeTimeout = setTimeout(resize, debounceThreshold)
  }
  animate() {
    const { renderer, composer, effectTV } = this
    const getTimePassed = () => this.getTimePassed()

    ;(function animationLoop() {
      requestAnimationFrame(animationLoop)
      renderer.clear()
      composer.render()
      effectTV.uniforms.time.value += getTimePassed()
    })()
  }
}
