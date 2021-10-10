precision highp float;

// an attribute will receive data from a buffer
attribute vec2 a_position;

uniform vec2 u_resolution;

// uniform that the app will set to the number of seconds since time origin (page open)
uniform float u_time;

vec2 rotate(vec2 v, float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat2(c, -s, s, c) * v;
}

// all shaders have a main function
void main() {
  mat3 projection = mat3(2.0 / u_resolution.x, 0, 0, 0, -2.0 / u_resolution.y, 0, -1, 1, 1);

  vec2 clipPosition = (projection * vec3(a_position, 1)).xy;

  // vec2 rotatedXY = rotate(vec2(clipPosition.x, clipPosition.y), u_time);

  // gl_Position is a special variable a vertex shader is responsible for setting
  gl_Position = vec4(clipPosition.x + sin(u_time * 2.0) + 1.0, clipPosition.y + cos(u_time) - 1.0, 0, 1);
  // gl_Position = vec4(clipPosition.x, clipPosition.y, 0, 1);
}
