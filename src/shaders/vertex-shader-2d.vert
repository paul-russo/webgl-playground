precision highp float;

// an attribute will receive data from a buffer
attribute vec2 a_position;

// uniform that the app will set to the number of seconds since time origin (page open)
uniform float u_time;

vec2 rotate(vec2 v, float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat2(c, -s, s, c) * v;
}

// all shaders have a main function
void main() {
  float deltaS = (sin(u_time) + 1.0) / 2.0;

  vec2 rotatedXY = rotate(vec2(a_position.x, a_position.y), u_time);

  // gl_Position is a special variable a vertex shader is responsible for setting
  gl_Position = vec4(rotatedXY.x + sin(u_time * 2.0), rotatedXY.y + cos(u_time), 0, 1.0 + deltaS);
}
