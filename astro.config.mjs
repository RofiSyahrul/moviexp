import path from 'path';

import node from '@astrojs/node';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';

import {
  assetsHashing,
  buildImageService,
  globalInjector,
  manifestGenerator,
} from './integrations';

dotenv.config();
const isVercel = process.env.DEPLOYMENT_PLATFORM === 'vercel';

// https://astro.build/config
export default defineConfig({
  adapter: isVercel ? vercel() : node({ mode: 'standalone' }),
  build: {
    format: 'file',
    inlineStylesheets: 'never',
  },
  image: {
    remotePatterns: [
      {
        hostname: '*.scdn.co',
      },
    ],
    service: {
      entrypoint: path.resolve(
        process.cwd(),
        './integrations/image-service/image-service.js',
      ),
    },
  },
  integrations: [
    svelte(),
    tailwind(),
    assetsHashing(),
    buildImageService(),
    globalInjector(),
    manifestGenerator(),
  ],
  output: 'server',
  scopedStyleStrategy: 'class',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '$lib/styles/mixins.scss';`,
        },
      },
    },
  },
});
