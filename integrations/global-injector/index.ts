import type { AstroIntegration } from 'astro';
import type { ViteUserConfig } from 'astro/config';

import pkg from '../../package.json';

export function globalInjector(): AstroIntegration {
  return {
    name: 'global-injector',
    hooks: {
      'astro:config:setup': ({ injectScript, updateConfig }) => {
        injectScript('page-ssr', 'import "$lib/styles.scss";');
        injectScript('page', 'import "$lib/script";');

        const viteConfig: ViteUserConfig = {
          define: {
            'import.meta.env.KEYWORDS': JSON.stringify(pkg.keywords),
          },
        };

        updateConfig({
          vite: viteConfig,
        });
      },
    },
  };
}
