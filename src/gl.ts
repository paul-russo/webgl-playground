// Create a shader of the specified type, compiled from the given source string.
const createShader = (
  gl: WebGLRenderingContext,
  type: GLenum,
  source: string
): WebGLShader => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const success: boolean = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
};

export const createVertexShader = (gl: WebGLRenderingContext, source: string) =>
  createShader(gl, gl.VERTEX_SHADER, source);

export const createFragmentShader = (
  gl: WebGLRenderingContext,
  source: string
) => createShader(gl, gl.FRAGMENT_SHADER, source);

// Create a program, a combination of a compiled vertex shader and a compiled fragment shader.
export const createProgram = (
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram => {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
};
