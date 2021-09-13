// fragment shaders don't have a default precision so we need to pick one. mediump is a good default
precision mediump float;

// uniform that the app will set to the current viewport size
uniform vec2 ViewportSize;

float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  // gl_FragColor is a special variable a fragment shader
  // is responsible for setting
  // gl_FragColor = vec4(1, 0, 0.5, 1); // return reddish-purple
  gl_FragColor = vec4(gl_FragCoord.x / ViewportSize.x, gl_FragCoord.y / ViewportSize.y, ((gl_FragCoord.x / ViewportSize.x) + (gl_FragCoord.y / ViewportSize.y)) / 2.0, 1.0);
}
