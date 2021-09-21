precision highp float;

// an attribute will receive data from a buffer
attribute vec4 a_position;

// uniform that the app will set to the number of seconds since time origin (page open)
uniform float Time;

mat2 rotation2d(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat2(c, -s, s, c);
}

vec2 rotate(vec2 v, float angle) {
  return rotation2d(angle) * v;
}

// all shaders have a main function
void main() {
  float deltaS = (sin(Time) + 1.0) / 2.0;

  vec2 rotatedXY = rotate(vec2(a_position.x, a_position.y), Time);

  // gl_Position is a special variable a vertex shader is responsible for setting
  gl_Position = vec4(rotatedXY.x + sin(Time * 2.0), rotatedXY.y + cos(Time), a_position.z, 1.0 + deltaS);
}
