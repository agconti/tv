import * as THREE from 'three'

const vertexShader = `
uniform float time;
uniform sampler2D tDiffuse;
uniform vec2 resolution;

varying vec2 vUv;

void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
const fragmentShader = `
uniform float time;
uniform sampler2D tDiffuse;
uniform vec2 resolution;
uniform float vignetteDarkness;
uniform float vignetteOffset;

varying vec2 vUv;

void main() {
	// distance from center of image, used to adjust blur
	vec2 uv = gl_FragCoord.xy / resolution.xy;
	float d = length(uv - vec2(0.5,0.5));

	// blur amount
	float blurAmount = 0.05;
	float blurPositiveRangeModifer = 0.5;
	float animationCurveTwoActionsPerSecond = (1.0 + sin(time * 10.0)) * blurPositiveRangeModifer;
	float animationCurveThreeActionsPerSecond = (1.0 + sin(time * 25.0)) * blurPositiveRangeModifer;
	float jaggedAnimationCurve = animationCurveTwoActionsPerSecond * animationCurveTwoActionsPerSecond;
	float blur = pow(jaggedAnimationCurve, 3.0);
  blur *= blurAmount;
	// reduce blur towards center
	blur *= d;

	// final color
	vec3 col;
	col.r = texture2D(tDiffuse, vec2(uv.x + blur, uv.y)).r;
	col.g = texture2D(tDiffuse, uv ).g;
	col.b = texture2D(tDiffuse, vec2(uv.x - blur, uv.y)).b;

	// scanline
	float scanline = sin(uv.y * 800.0) * 0.04;
	col -= scanline;

	// Eskil's vignette
	vec4 color = vec4(col, 1.0);
	vec2 oUv = ( vUv - vec2( 0.5 ) ) * vec2( vignetteOffset );
	gl_FragColor = vec4( mix( color.rgb, vec3( 1.0 - vignetteDarkness ), dot( oUv, oUv ) ), color.a );
}
`

const uniforms = {
  time: { value: 0.0 }
, tDiffuse: { value: null }
, resolution: { value: THREE.Vector2() }
, vignetteOffset: { value: 0.7 }
, vignetteDarkness: { value: 0.7 }
}
const TVShader = {
	uniforms
, vertexShader
, fragmentShader
}

export default TVShader
