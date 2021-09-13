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
    outdir: 'www/js',
    plugins: [
      glsl({
        minify: false,
      }),
    ],
  }
);
