import * as THREE from 'three'
import CopyShader from './CopyShader'
import BloomPass from './BloomPass'
import RenderPass from './RenderPass'
import ShaderPass from './ShaderPass'
import { EffectComposer } from './EffectComposer'

export default function start (containerEl, videoEl, containerWidth, containerHeight) {
  var container;
  var camera, scene, renderer;
  var video, texture, material, mesh;
  var composer;
  var mouseX = 0;
  var mouseY = 0;
  var windowHalfX = containerWidth / 2;
  var windowHalfY = containerHeight / 2;
  var cube_count,
  meshes = [],
  materials = [],
  xgrid = 20,
  ygrid = 10;
  init();
  animate();
  function init() {
    camera = new THREE.PerspectiveCamera( 40, containerWidth / containerHeight, 1, 10000 );
    camera.position.z = 500;
    scene = new THREE.Scene();
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0.5, 1, 1 ).normalize();
    scene.add( light );
    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( containerWidth, containerHeight );
    containerEl.appendChild( renderer.domElement );
    video = videoEl;
    texture = new THREE.VideoTexture( video );
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;
    //
    var i, j, ux, uy, ox, oy,
    geometry,
    xsize, ysize;
    ux = 1 / xgrid;
    uy = 1 / ygrid;
    xsize = 480 / xgrid;
    ysize = 204 / ygrid;
    var parameters = { color: 0xffffff, map: texture };
    cube_count = 0;
    for ( i = 0; i < xgrid; i ++ )
    for ( j = 0; j < ygrid; j ++ ) {
      ox = i;
      oy = j;
      geometry = new THREE.BoxGeometry( xsize, ysize, xsize );
      change_uvs( geometry, ux, uy, ox, oy );
      materials[ cube_count ] = new THREE.MeshLambertMaterial( parameters );
      material = materials[ cube_count ];
      material.hue = i/xgrid;
      material.saturation = 1 - j/ygrid;
      material.color.setHSL( material.hue, material.saturation, 0.5 );
      mesh = new THREE.Mesh( geometry, material );
      mesh.position.x =   ( i - xgrid/2 ) * xsize;
      mesh.position.y =   ( j - ygrid/2 ) * ysize;
      mesh.position.z = 0;
      mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;
      scene.add( mesh );
      mesh.dx = 0.001 * ( 0.5 - Math.random() );
      mesh.dy = 0.001 * ( 0.5 - Math.random() );
      meshes[ cube_count ] = mesh;
      cube_count += 1;
    }
    renderer.autoClear = false;
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    // postprocessing
    var renderModel = new RenderPass( scene, camera );
    var effectBloom = new BloomPass( 1.3 );
    var effectCopy = new ShaderPass( CopyShader );
    effectCopy.renderToScreen = true;
    composer = new EffectComposer( renderer );
    composer.addPass( renderModel );
    composer.addPass( effectBloom );
    composer.addPass( effectCopy );
    //
    window.addEventListener( 'resize', onWindowResize, false );
  }
  function onWindowResize() {
    windowHalfX = containerWidth / 2;
    windowHalfY = containerHeight / 2;
    camera.aspect = containerWidth / containerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( containerWidth, containerHeight );
    composer.reset();
  }
  function change_uvs( geometry, unitx, unity, offsetx, offsety ) {
    var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
    for ( var i = 0; i < faceVertexUvs.length; i ++ ) {
      var uvs = faceVertexUvs[ i ];
      for ( var j = 0; j < uvs.length; j ++ ) {
        var uv = uvs[ j ];
        uv.x = ( uv.x + offsetx ) * unitx;
        uv.y = ( uv.y + offsety ) * unity;
      }
    }
  }
  function onDocumentMouseMove(event) {
    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY ) * 0.3;
  }
  //
  function animate() {
    requestAnimationFrame( animate );
    render();
  }
  var h, counter = 1;
  function render() {
    var time = Date.now() * 0.00005;
    camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
    camera.lookAt( scene.position );
    for ( let i = 0; i < cube_count; i ++ ) {
      material = materials[ i ];
      h = ( 360 * ( material.hue + time ) % 360 ) / 360;
      material.color.setHSL( h, material.saturation, 0.5 );
    }
    if ( counter % 1000 > 200 ) {
      for ( let i = 0; i < cube_count; i ++ ) {
        mesh = meshes[ i ];
        mesh.rotation.x += 10 * mesh.dx;
        mesh.rotation.y += 10 * mesh.dy;
        mesh.position.x += 200 * mesh.dx;
        mesh.position.y += 200 * mesh.dy;
        mesh.position.z += 400 * mesh.dx;
      }
    }
    if ( counter % 1000 === 0 ) {
      for ( let i = 0; i < cube_count; i ++ ) {
        mesh = meshes[ i ];
        mesh.dx *= -1;
        mesh.dy *= -1;
      }
    }
    counter ++;
    renderer.clear();
    composer.render();
  }
}
