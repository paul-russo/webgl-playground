import vertexShader2dSource from './shaders/vertex-shader-2d.vert';
import fragmentShader2dSource from './shaders/fragment-shader-2d.frag';
import { createFragmentShader, createProgram, createVertexShader } from './gl';
import { createPointArray, resizeCanvasToDisplaySize } from './utility';

import './app.css';

// Get the WebGL rendering context
const canvas: HTMLCanvasElement = document.querySelector('#c');
const gl = canvas.getContext('webgl');

// Compile the vertex and fragment shaders, and combine them into a program
const vertexShader = createVertexShader(gl, vertexShader2dSource);
const fragmentShader = createFragmentShader(gl, fragmentShader2dSource);
const program = createProgram(gl, vertexShader, fragmentShader);

// Look up the location of the attribute defined in the vertex shader
const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

const resolutionUniformLocation = gl.getUniformLocation(
  program,
  'u_resolution'
);

const timeUniformLocation = gl.getUniformLocation(program, 'u_time');

// Create and bind a buffer to store data for the position attribute
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// 12 2d points, representing 4 triangles
const positions = createPointArray([
  // first triangle
  [100, 100],
  [150, 200],
  [200, 200],
  // second triangle
  [100, 100],
  [150, 0],
  [200, 0],
  // third triangle
  [100, 100],
  [50, 0],
  [0, 0],
  // fourth triangle
  [100, 100],
  [50, 200],
  [0, 200],
]);

gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

const render = (timestamp: number) => {
  // Set the viewport
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // Set the uniform to the clientWidth and clientHeight of the canvas
  gl.uniform2f(
    resolutionUniformLocation,
    canvas.clientWidth,
    canvas.clientHeight
  );

  // Set the time index
  gl.uniform1f(timeUniformLocation, timestamp / 1000);

  // Enable the position attribute
  gl.enableVertexAttribArray(positionAttributeLocation);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  gl.vertexAttribPointer(
    positionAttributeLocation,
    2, // size: 2 array elements per iteration
    gl.FLOAT, // type: the data are 32bit floats
    false, // normalized: don't normalize the data
    0, // stride: 0 = move forward size * sizeof(type) each iteration to get the next position
    0 // offset: start at the beginning of the buffer
  );

  // Draw enabled array
  gl.drawArrays(gl.TRIANGLES, 0, 12);

  requestAnimationFrame(render);
};

resizeCanvasToDisplaySize(canvas);
requestAnimationFrame(render);

window.addEventListener('resize', () => {
  resizeCanvasToDisplaySize(canvas);
  console.log({ width: gl.canvas.width, height: gl.canvas.height });
});
