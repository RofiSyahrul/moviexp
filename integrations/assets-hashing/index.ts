import type { AstroConfig, AstroIntegration } from 'astro';

interface PreRenderedChunk {
  facadeModuleId: string | null;
  name: string;
}

function generateServerChunkFileNames({
  facadeModuleId,
  name,
}: PreRenderedChunk) {
  const extension = '.js';
  const astroPageModuleId = '@astro-page:src/pages/';

  if (facadeModuleId?.includes(astroPageModuleId)) {
    const pagePath = facadeModuleId.split(astroPageModuleId)[1];
    if (pagePath) {
      const filePath = pagePath
        .replaceAll(/\[([^[\]]+)]/g, '$$$1') // dijual/[type] -> dijual/$type
        .replace('@_@', '.'); // dijual/index@_@astro -> dijual/index.astro
      return 'pages/' + filePath + extension;
    }
  }

  const prefix = 'chunks/';
  if (name === 'astro') return prefix + '_astro' + extension;

  const suffix = '[hash]' + extension;
  if (name.startsWith('pages/')) return prefix + 'pages/' + suffix;
  return prefix + suffix;
}

export function assetsHashing(): AstroIntegration {
  let astroConfig: AstroConfig;

  return {
    name: 'assets-hashing',
    hooks: {
      'astro:config:done': ({ config }) => {
        astroConfig = config;
      },

      'astro:build:setup': ({ target, vite }) => {
        let viteRollupOutput = (vite.build!.rollupOptions!.output ??=
          {});

        if (Array.isArray(viteRollupOutput)) {
          viteRollupOutput = viteRollupOutput[0];
        }

        const assetsDirectory = astroConfig.build.assets;
        viteRollupOutput.assetFileNames = `${assetsDirectory}/[ext]/[hash].[ext]`;

        if (target === 'server') {
          viteRollupOutput.chunkFileNames =
            generateServerChunkFileNames;
          return;
        }

        viteRollupOutput.chunkFileNames = `${assetsDirectory}/js/chunk.[hash].js`;
        viteRollupOutput.entryFileNames = `${assetsDirectory}/js/_entry.[hash].js`;
      },
    },
  };
}
