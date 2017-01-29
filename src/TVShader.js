import * as THREE from 'three'

const vertexShader = `
/*
The MIT License (MIT)

Copyright (c) 2017 Andrew Conti

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

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
/*
The MIT License (MIT)

Copyright (c) 2017 Andrew Conti

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

Based on Justin Saunders ChromaticalShader. https://www.shadertoy.com/view/XdXXD4
*/

uniform float time;
uniform sampler2D tDiffuse;
uniform vec2 resolution;

varying vec2 vUv;

void main() {
	// distance from center of image, used to adjust blur
  vec2 uv = gl_FragCoord.xy / resolution.xy;
	float d = length(uv - vec2(0.5,0.5));

	// blur amount
	float blur = 0.0;
	blur = (1.0 + sin(time * 6.0)) * 0.5;
	blur *= 1.0 + sin(time * 16.0) * 0.5;
	blur = pow(blur, 3.0);
	blur *= 0.05;
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

	// vignette
	col *= 1.0 - d * 0.5;
  gl_FragColor = vec4(col, 1.0);

	// // Eskil's vignette
	//
	// "vec4 texel = texture2D( tDiffuse, vUv );",
	// "vec2 uv = ( vUv - vec2( 0.5 ) ) * vec2( offset );",
	// "gl_FragColor = vec4( mix( texel.rgb, vec3( 1.0 - darkness ), dot( uv, uv ) ), texel.a );",
	//
	// /*
	// // alternative version from glfx.js
	// // this one makes more "dusty" look (as opposed to "burned")
	//
	// "vec4 color = texture2D( tDiffuse, vUv );",
	// "float dist = distance( vUv, vec2( 0.5 ) );",
	// "color.rgb *= smoothstep( 0.8, offset * 0.799, dist *( darkness + offset ) );",
	// "gl_FragColor = color;",
}
`

const uniforms = {
  time: { value: 0.0 }
, tDiffuse: { value: null }
, resolution: { value: THREE.Vector2() }
}
const TVShader = {
	uniforms
, vertexShader
, fragmentShader
}

export default TVShader
