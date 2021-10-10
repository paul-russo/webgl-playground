// fragment shaders don't have a default precision so we need to pick one. mediump is a good default
precision highp float;

// uniform that the app will set to the current viewport size
uniform vec2 u_resolution;

// uniform that the app will set to the number of seconds since time origin (page open)
uniform float u_time;

void main() {
  // gl_FragColor is a special variable a fragment shader is responsible for setting
  gl_FragColor = vec4((gl_FragCoord.x / u_resolution.x) * ((sin(u_time * 2.0) + 1.0) / 2.0), (gl_FragCoord.y / u_resolution.y) * ((cos(u_time) + 1.0) / 2.0), (sin(u_time) + 1.0) / 2.0, 1.0);
  // gl_FragColor = vec4(1, 1, 1, 1);
}
