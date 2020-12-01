import { writable, readable, derived } from 'svelte/store';
import { lightenColor } from './utils';

export const activeArticleItem = writable(0);
export const activeVisItem = writable(0);

export const activeWaypoint = writable(null);
export const activeKey = writable(null);

export const activeCategory = writable(null);
export const data = writable(null);
export const travelType = writable('car');
export const distance = writable(50);
export const zipcodes = writable([]);
export const activeZipcode = writable(41372);
export const isLocal = readable(true);

export const emissionenActiveData = derived(
    [data, activeWaypoint],
    ([$data, $activeWaypoint]) => {
        console.log("$activeWaypoint", $activeWaypoint)
        if ($data && $activeWaypoint) {
            return $data.emissionen[$activeWaypoint];
        }
    }
)

export const selectedData = derived(
	[data, activeCategory],
	([$data, $activeCategory]) => {
		if ($activeCategory && $data) {
			return $data.emissions[$activeCategory]
		} 
    });
    
export const activeColor = derived(
    travelType,
    ($travelType) => {
        const colors = {
            bike: '#3C3372',
            public: '#61BBA0',
            car_mf: '#E2733B',
            ecar: '#4790D0',
            car: '#E2733B',
        }
        return colors[$travelType];
    }
)

export const activeColor20 = derived(
    activeColor,
    ($activeColor) => {
        return lightenColor($activeColor, 5);
    }
)
