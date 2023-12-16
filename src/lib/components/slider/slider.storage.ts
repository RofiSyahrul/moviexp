import { array, integer, is, string, tuple } from 'superstruct';

import { getReferrerURL } from '$lib/client/referrer';

const ActiveIndexStorageMapArray = array(
  tuple([string(), integer()]),
);

class ActiveIndexStorage {
  private storage = false;
  private key = '__a_idx__';
  private map = new Map<string, number>();

  private getMap() {
    if (this.storage) return this.map;

    const referrerURL = getReferrerURL();

    if (
      !referrerURL ||
      referrerURL.origin !== window.location.origin
    ) {
      return this.map;
    }

    const raw = localStorage.getItem(this.key);
    if (!raw) return this.map;

    try {
      const rawMap = JSON.parse(raw);
      if (is(rawMap, ActiveIndexStorageMapArray)) {
        this.map = new Map(rawMap);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Failed to parse ${raw}`, error);
    } finally {
      this.storage = true;
    }

    return this.map;
  }

  public get(uid: string): number | undefined {
    return this.getMap().get(uid);
  }

  public set(uid: string, value: number) {
    this.map.set(uid, value);
    localStorage.setItem(
      this.key,
      JSON.stringify([...this.map.entries()]),
    );
  }
}

export const activeIndexStorage = new ActiveIndexStorage();
