import { REFERRER } from '$lib/constants/custom-meta';

export function getReferrerURL(): URL | null {
  let referrer = document.referrer;
  const metaReferrer = document.querySelector<HTMLMetaElement>(
    `meta[name="${REFERRER}"]`,
  );

  if (metaReferrer?.content) {
    referrer = metaReferrer.content;
  }

  if (!referrer) return null;

  return new URL(referrer, window.location.origin);
}
