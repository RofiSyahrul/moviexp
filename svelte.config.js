import { vitePreprocess } from '@astrojs/svelte';

export default {
  preprocess: vitePreprocess({
    style: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@import './src/lib/styles/mixins.scss';`,
          },
        },
      },
    },
  }),
};
