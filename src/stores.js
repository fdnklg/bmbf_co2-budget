import { writable, derived } from 'svelte/store';

export const activeArticleItem = writable(0);
export const activeVisItem = writable(0);

export const activeCategory = writable(null);
export const data = writable(null);
export const type = writable('opnv'); // opnv, car, carPlus, walk; 
export const distance = writable(50); // 5, 10, 25, 50
export const zipcodes = writable([]);

export const selectedData = derived(
	[data, activeCategory],
	([$data, $activeCategory]) => {
		if ($activeCategory && $data) {
			return $data.emissions[$activeCategory]
		} 
    });
    
export const activeColor = derived(
    type,
    ($type) => {
        const colors = {
            walk: '#3C3372',
            opnv: '#61BBA0',
            car: '#E2733B',
            carplus: '#4790D0',
        }
        return colors[$type];
    }
)
