export interface FetcherParams<Q extends object = object> {
  body?: BodyInit;
  headers?: HeadersInit;
  method?: 'GET' | 'POST';
  query?: Q;
  url: string;
}

const DEFAULT_BASE_URL = import.meta.env.TMDB_API_URL;

function buildURL<Q extends object>(url: string, query?: Q) {
  const finalURL = new URL(url, DEFAULT_BASE_URL);

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
  body,
  headers: headersInit,
  method,
  query,
  url,
}: FetcherParams<Q>): Promise<T> {
  const headers = new Headers(headersInit);
  if (!headers.get('Authorization')) {
    headers.set(
      'Authorization',
      `Bearer ${import.meta.env.TMDB_ACCESS_TOKEN}`,
    );
  }

  const response = await fetch(buildURL(url, query), {
    body,
    headers,
    method,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data: T = await response.json();
  return data;
}
