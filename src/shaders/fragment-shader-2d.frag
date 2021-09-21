// fragment shaders don't have a default precision so we need to pick one. mediump is a good default
precision mediump float;

// uniform that the app will set to the current viewport size
uniform vec2 ViewportSize;
uniform float Time;

void main() {
  // gl_FragColor is a special variable a fragment shader is responsible for setting
  gl_FragColor = vec4((gl_FragCoord.x / ViewportSize.x) * ((sin(Time * 2.0) + 1.0) / 2.0), (gl_FragCoord.y / ViewportSize.y) * ((cos(Time) + 1.0) / 2.0), (sin(Time) + 1.0) / 2.0, 1.0);
}
