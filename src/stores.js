import { writable, derived } from 'svelte/store';

export const activeArticleItem = writable(0);
export const activeVisItem = writable(0);

export const activeCategory = writable(null);
export const data = writable(null);
export const type = writable('opnv'); // opnv, car, carPlus, walk; 
export const distance = writable(50); // opnv, car, carPlus, walk; 

export const selectedData = derived(
	[data, activeCategory],
	([$data, $activeCategory]) => {
		if ($activeCategory && $data) {
			return $data.emissions[$activeCategory]
		} 
	});
