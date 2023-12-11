import { defineMiddleware } from 'astro:middleware';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import UAParser from 'ua-parser-js';

import type { UABrowser, UserAgent } from './lib/types/user-agent';

const mobileDeviceTypes = new Set([
  UAParser.DEVICE.MOBILE,
  UAParser.DEVICE.WEARABLE,
]);

function isSupportAvif(browser: UABrowser): boolean {
  if (!browser.name) return false;

  const browserName = browser.name.toLowerCase();
  const isSafari = browserName.includes('safari');

  if (isSafari) {
    const SUPPORTED_SAFARI_VERSION_FOR_AVIF = 16;
    const majorVersion = parseInt(
      browser.version.split('.')[0] || '0',
    );
    return majorVersion >= SUPPORTED_SAFARI_VERSION_FOR_AVIF;
  }

  const isEdge = browserName.includes('edge');
  return !isEdge;
}

function parseUserAgent(request: Request): UserAgent {
  const userAgent = request.headers.get('user-agent') ?? '';
  const parsedUA = UAParser(userAgent);

  const { browser, device } = parsedUA ?? {};
  const deviceType = device?.type ?? '';
  const isMobile = mobileDeviceTypes.has(deviceType);

  const uaBrowser: UABrowser = {
    name: browser?.name ?? '',
    version: browser?.version ?? '',
  };

  return {
    browser: uaBrowser,
    isMobile,
    isSupportAvif: isSupportAvif(uaBrowser),
  };
}

dayjs.extend(advancedFormat);

export const onRequest = defineMiddleware((context, next) => {
  context.locals.userAgent = parseUserAgent(context.request);
  return next();
});
