/// <reference types="astro/client" />

import type { UserAgent } from './lib/types/user-agent';

declare global {
  namespace App {
    interface Locals {
      userAgent: UserAgent;
    }
  }

  interface ImportMetaEnv {
    readonly API_KEY: string;
    readonly API_URL: string;
    readonly KEYWORDS: string[];
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface DocumentEventMap {
    'astro:after-swap': Event;
    'astro:page-load': Event;
  }

  interface Window {
    __TOTAL_SEARCH_RESULT__: number;
  }

  interface Array<T> {
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to begin searching for searchElement.
     */
    includes(searchElement: T, fromIndex?: number): boolean;
    includes(
      searchElement: unknown,
      fromIndex?: number,
    ): searchElement is T;
  }

  interface Set<T> {
    /**
     * @returns a boolean indicating whether an element with the specified value exists in the Set or not.
     */
    has(value: T): boolean;
    has(value: unknown): value is T;
  }
}
