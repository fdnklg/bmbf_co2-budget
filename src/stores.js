import { writable } from 'svelte/store';

export const activeArticleItem = writable(0);
export const activeVisItem = writable(0);
export const chartData = writable(null);