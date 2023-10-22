interface FetcherParams<Q extends object = object> {
  query?: Q;
  url: string;
}

const DEFAULT_BASE_URL = import.meta.env.API_URL;

function buildURL<Q extends object>(url: string, query?: Q) {
  const finalURL = new URL(url, DEFAULT_BASE_URL);
  finalURL.searchParams.set('apiKey', import.meta.env.API_KEY);

  if (!query) return finalURL;

  for (const key in query) {
    const value = query[key];
    if (!value) continue;
    if (typeof value === 'object') {
      finalURL.searchParams.set(key, JSON.stringify(value));
    } else {
      finalURL.searchParams.set(key, String(value));
    }
  }

  return finalURL;
}

export default async function fetcher<T, Q extends object = object>({
  query,
  url,
}: FetcherParams<Q>): Promise<T> {
  const response = await fetch(buildURL(url, query));

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data: T = await response.json();
  return data;
}
