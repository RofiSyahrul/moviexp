/* eslint-disable no-console */
import { writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import type { AstroIntegration } from 'astro';

import pkg from '../../package.json';
import appConfig from '../../src/lib/app.config';

type ManifestIcon = {
  src: string;
  sizes: string;
  type: string;
};

function generateManifestIcons(): ManifestIcon[] {
  const icons: ManifestIcon[] = [];

  appConfig.manifest.iconSizes.forEach(iconSize => {
    const sizes = `${iconSize}x${iconSize}`;
    const icon: ManifestIcon = {
      src: `/icons/android-chrome-${sizes}.png`,
      sizes,
      type: 'image/png',
    };

    icons.push(icon);
  });

  return icons;
}

function generateBrowserConfigContent() {
  const browserConfigIcon = Object.entries(
    appConfig.manifest.msTileIcon,
  )
    .map(
      ([key, value]) =>
        `<${value}${key}logo src="/icons/mstile-${key}.png" />`,
    )
    .join('\n\t\t\t');

  return `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      ${browserConfigIcon}
      <TileColor>${appConfig.manifest.themeColor}</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
}

async function generateManifest() {
  const icons = generateManifestIcons();

  const manifest = {
    name: appConfig.manifest.name,
    short_name: appConfig.manifest.name,
    version: pkg.version,
    description: appConfig.manifest.description,
    background_color: appConfig.manifest.backgroundColor,
    theme_color: appConfig.manifest.themeColor,
    start_url: '/',
    display: 'standalone',
    scope: '/',
    icons,
  };

  const browserConfigContent = generateBrowserConfigContent();

  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const publicPath = path.resolve(dirname, '../../public');
  const manifestPath = path.resolve(publicPath, 'manifest.json');
  const browserConfigPath = path.resolve(
    publicPath,
    'browserconfig.xml',
  );

  try {
    await Promise.all([
      writeFile(manifestPath, JSON.stringify(manifest, null, 2), {
        encoding: 'utf-8',
      }),
      writeFile(browserConfigPath, browserConfigContent, {
        encoding: 'utf-8',
      }),
    ]);
    console.log(
      '\x1b[32m%s\x1b[0m',
      `Generate manifest file ${manifestPath}
      and browserconfig file ${browserConfigPath} success 🚀`,
    );
  } catch (error) {
    console.log(
      '\x1b[31m%s\x1b[0m',
      `Couldn't generate manifest file ${manifestPath}
      and browserconfig file ${browserConfigPath} 🤦 .
      Error: ${(error as Error).message}`,
    );
  }
}

export function manifestGenerator(): AstroIntegration {
  return {
    name: 'manifest-generator',
    hooks: {
      'astro:config:setup': async () => {
        await generateManifest();
      },
    },
  };
}
