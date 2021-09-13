import vertexShader2dSource from './shaders/vertex-shader-2d.vert';
import fragmentShader2dSource from './shaders/fragment-shader-2d.frag';
import { createFragmentShader, createProgram, createVertexShader } from './gl';

// Get the WebGL rendering context
const canvas: HTMLCanvasElement = document.querySelector('#c');
const gl = canvas.getContext('webgl');

// Compile the vertex and fragment shaders, and combine them into a program
const vertexShader = createVertexShader(gl, vertexShader2dSource);
const fragmentShader = createFragmentShader(gl, fragmentShader2dSource);
const program = createProgram(gl, vertexShader, fragmentShader);

// Look up the location of the attribute defined in the vertex shader
const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

// Create and bind a buffer to store data for the position attribute
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// Three 2d points
const positions = [0, 0, 0, 0.5, 0.7, 0];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

const render = () => {
  // Set the viewport
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // Enable the position attribute
  gl.enableVertexAttribArray(positionAttributeLocation);

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

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
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

render();
