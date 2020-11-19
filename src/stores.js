import { writable, derived } from 'svelte/store';

export const activeArticleItem = writable(0);
export const activeVisItem = writable(0);
export const chartData = writable(null);

export const activeCategory = writable(null);
export const data = writable(null);

export const selectedData = derived(
	[data, activeCategory],
	([$data, $activeCategory]) => {
		if ($activeCategory && $data) {
			return $data.emissions[$activeCategory]
		} 
	});
