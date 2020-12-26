export function capitalize(
  str: string,
  { autoLowerCase = false, firstLetterOnly = false } = {}
): string {
  if (autoLowerCase) str = str.toLowerCase();
  return str.replace(firstLetterOnly ? /^\S/g : /(^|\s)\S/g, match =>
    match.toUpperCase()
  );
}

export function cast<T = General>(value: string): T {
  try {
    return JSON.parse(value);
  } catch {
    if (!value) return (undefined as unknown) as T;
    return (value as unknown) as T;
  }
}

export function decode(value = ''): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function encode(value = ''): string {
  try {
    return encodeURIComponent(value);
  } catch {
    return value;
  }
}

export function parseQs<
  K extends string | number | symbol = string,
  V = General
>(qs = ''): Record<K, V> {
  qs = qs.replace('?', '');

  const result = qs.split('&').reduce((obj, keyvalue) => {
    const [key, value] = keyvalue.split('=');
    const decoded = decode(value);
    obj[key] = cast(decoded);
    return obj;
  }, {} as Record<K, V>);

  return result;
}

export function stringifyQs<
  K extends string | number | symbol = string,
  V = General
>(queryObj: Record<K, V>): string {
  const keys = Object.keys(queryObj);
  if (!keys.length) return '';
  return keys
    .reduce((str, key) => {
      const value = queryObj[key];
      if (value) {
        if (typeof value !== 'object') {
          str += `${key}=${encode(`${value}`)}&`;
        } else {
          str += `${key}=${encode(JSON.stringify(value))}&`;
        }
      }
      return str;
    }, '?')
    .replace(/&$/, '');
}

export function mergeQs(
  qs: string | Record<string | number | symbol, General> = '',
  mergeWith: string | Record<string | number | symbol, General> = ''
): string {
  const queryObj = typeof qs === 'object' ? qs : parseQs(qs);
  const otherQueryObj =
    typeof mergeWith === 'object' ? mergeWith : parseQs(mergeWith);

  const newQueryObj = { ...queryObj, ...otherQueryObj };
  return stringifyQs(newQueryObj);
}

export function numberStringify(
  number: number,
  entity: string,
  pluralForm?: string
): string {
  if (typeof number !== 'number') return '';
  const name = number > 1 ? pluralForm || `${entity}s` : entity;
  return `${number} ${name}`;
}
