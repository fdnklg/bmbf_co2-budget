import { writable, readable, derived } from 'svelte/store';
import { lightenColor, fetchJson } from './utils';
import { s3Url, isoChronesUrl } from './config';
import { emissDistance, sets } from 'components/Widget/utils.js'
import { createGeojson, createFeature, createCircle } from "components/Map/util.js";

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
        if ($data && $activeWaypoint) {
            return $data.emissionen[$activeWaypoint];
        }
    }
)

export const sektorenData = derived(
    [data, activeWaypoint],
    ([$data, $activeWaypoint]) => {
        if ($data && $activeWaypoint) {
            return $data.sektoren[$activeWaypoint];
        }
    }
)

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


  /*
    - co2 emissionen auf 100km im widget 
    - add object to d array in widget object 
    - füge daten in widget objekt hinzu
    - es muss ein parameter dabei sein, der bestimmtes ob wir konvertiere werte 
  */

export const szenarienData = derived(
    [data, travelType, distance, activeZipcode],
    ([$data, $travelType, $distance, $activeZipcode]) => {
        if ($data) {
            const current = $data.szenarien;
            const szenarienKeys = Object.keys($data.szenarien);

            const getData = async () => {
                const centroid = await fetchJson(`${s3Url}centroids/${$activeZipcode}.json`);
                const { x, y } = centroid;
                const isochrones = await fetchJson(`${isoChronesUrl}isochrones/${$activeZipcode}_${$travelType}.json`);
                
                // iteriere über alle szenarien
                szenarienKeys.map((szenario, i) => {
                    // füge isochrone namen array zu daten objekt
                    const szenarioObject = $data.szenarien[szenario];
                    const { diameter } = szenarioObject;
                    const isochroneNames = sets[$travelType][i];
                    szenarioObject.isochrones = isochroneNames;
                    const geojson = createGeojson();

                    szenarioObject.centroid = centroid;

                    szenarioObject.geojsons = [];

                    szenarioObject.isochrones.map(name => {
                        if (diameter) {
                            geojson.features.push(createCircle([x, y], $distance));
                        };
                        if (isochroneNames && isochroneNames.length > 0) {
                            isochroneNames.map((name) => {
                                const path = isochrones[`${name}`];
                                const isochroneFeat = createFeature(path);
                                geojson.features.push(isochroneFeat);
                            });
                        }
                    })
                    szenarioObject.geojsons.push(geojson);
                })
 
            }

            getData();
    
            // console.log('$data.szenarien', $data.szenarien)
            // if (current) { 
            //     const { widget, isochrone } = current;
    
            //     const obj = {
            //         type: $travelType,
            //         value: emissDistance($travelType, $distance),
            //         color: $activeColor
            //     }
    
            //     widget.d.push(obj);
            //     const max = Math.max(...widget.d.map(d => d.value));
            //     const onePercent = max / 100;
    
            //     widget.d = widget.d.map(d => ({
            //         ...d,
            //         x: d.value / onePercent,
            //         y: 1,
            //     }))
    
            // }
            return $data.szenarien;
        }

    
    }
)

export const szenarienDataActive = derived(
    [szenarienData, activeWaypoint],
    ([$szenarienData, $activeWaypoint]) => {
        if ($szenarienData && $activeWaypoint) {
            return $szenarienData[$activeWaypoint];
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


export const activeColor20 = derived(
    activeColor,
    ($activeColor) => {
        return lightenColor($activeColor, 5);
    }
)
