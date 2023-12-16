import { navigate } from 'astro:transitions/client';

import { getReferrerURL } from './referrer';

function getURLOriginAndPathname(url: string | URL) {
  const urlObject = new URL(url, window.location.origin);
  return urlObject.origin + urlObject.pathname;
}

function getReferrerOriginAndPathname() {
  const referrer = getReferrerURL();
  if (!referrer) return null;
  return getURLOriginAndPathname(referrer);
}

function isMatch(
  referrerOriginAndPathname: string,
  destination: string,
) {
  return (
    referrerOriginAndPathname === getURLOriginAndPathname(destination)
  );
}

export default function goBack(...destinations: string[]) {
  if (destinations.length === 0) {
    history.back();
    return;
  }

  const referrerOriginAndPathname = getReferrerOriginAndPathname();
  if (!referrerOriginAndPathname) {
    navigate(destinations[0], { history: 'replace' });
    return;
  }

  const isReferrerMatchWithDestination = destinations.some(
    destination => isMatch(referrerOriginAndPathname, destination),
  );

  if (isReferrerMatchWithDestination) {
    history.back();
  } else {
    navigate(destinations[0], { history: 'replace' });
  }
}
