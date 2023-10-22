import { writable } from 'svelte/store';

export const searchQuery = writable('');
export const isSearchBoxShown = writable(false);
export const searchPage = writable(1);
