import { serve } from 'esbuild';
import { glsl } from 'esbuild-plugin-glsl';

serve(
  {
    servedir: 'www',
    onRequest: ({ method, timeInMS, path, status }) => {
      console.log(`[${status}] ${method} ${path} - ${timeInMS}ms`);
    },
  },
  {
    entryPoints: ['src/app.ts'],
    bundle: true,
    outdir: 'www/static',
    plugins: [
      glsl({
        minify: false,
      }),
    ],
  }
).then((result) => {
  console.log(`Serving on port ${result.port}`);
});
