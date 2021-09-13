export const resizeCanvasToDisplaySize = (canvas: HTMLCanvasElement) => {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const { clientWidth, clientHeight } = canvas;

  // Check if the canvas is not the same size.
  const needResize =
    canvas.width !== clientWidth || canvas.height !== clientHeight;

  if (needResize) {
    // Make the canvas the same size
    canvas.width = clientWidth;
    canvas.height = clientHeight;
  }

  return needResize;
};

export const createPointArray = (arr: number[][]) =>
  new Float32Array(arr.flat());
