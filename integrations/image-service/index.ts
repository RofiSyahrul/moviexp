/* eslint-disable no-console */
import path from 'path';
import { fileURLToPath } from 'url';

import type { AstroIntegration } from 'astro';
import { build } from 'esbuild';

interface EntryPoint {
  in: string;
  out: string;
}

export function buildImageService(): AstroIntegration {
  return {
    name: 'build-image-service',
    hooks: {
      'astro:config:setup': async () => {
        try {
          const dir = path.dirname(fileURLToPath(import.meta.url));

          const entryPoints: EntryPoint[] = [
            {
              in: './image-service',
              out: 'image-service',
            },
          ];

          await build({
            absWorkingDir: dir,
            bundle: true,
            external: ['astro'],
            entryPoints,
            format: 'esm',
            minify: true,
            outdir: '.',
          });

          const outputFiles = entryPoints.map(entryPoint =>
            path.resolve(dir, `${entryPoint.out}.js`),
          );

          console.log(
            '\u001B[32m%s\u001B[0m',
            `Build image-service success!\nOutput Files:\n- ${outputFiles.join(
              '\n- ',
            )}\n`,
          );
        } catch (error) {
          console.error(
            '\u001B[31m%s\u001B[0m',
            'Build image service error',
          );
          console.error('\u001B[31m%s\u001B[0m', error);
          throw error;
        }
      },
    },
  };
}
