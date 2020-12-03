import { writable, readable, derived } from 'svelte/store';
import { lightenColor, fetchJson } from './utils';
import { s3Url, isoChronesUrl } from './config';
import { emissDistance, sets, emissions } from 'components/Widget/utils.js';
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

export const szenarienData = derived(
    [data, travelType, distance, activeZipcode, activeColor],
    ([$data, $travelType, $distance, $activeZipcode, $activeColor]) => {
        if ($data) {
            const szenarienKeys = Object.keys($data.szenarien);

            // laden der externen Daten und Aufbereitung der Jsons
            const getData = async () => {
                const centroid = await fetchJson(`${s3Url}centroids/${$activeZipcode}.json`);
                const isoJson = await fetchJson(`${isoChronesUrl}isochrones/${$activeZipcode}_${$travelType}.json`);
                
                // iteriere über alle szenarien
                szenarienKeys.map((szenario, i) => {
                    // füge isochrone namen array zu daten objekt
                    const szenarioObject = $data.szenarien[szenario];
                    const { diameter, isochrones } = szenarioObject;
                    const isochroneNames = sets[$travelType][i];
                    szenarioObject.isochrones = isochroneNames;
                    szenarioObject.centroid = centroid;

                    // erstelle geojson
                    const geojson = createGeojson();
                    if (diameter && centroid) {
                        geojson.features.push(createCircle([centroid.x, centroid.y], $distance));
                    };

                    // füge features der isochrone (die im sets array^)in geojson
                    if (szenarioObject && szenarioObject.isochrones) {
                        szenarioObject.isochrones.map(name => {
                            if (isochroneNames && isochroneNames.length > 0) {
                                isochroneNames.map((name) => {
                                    const path = isoJson[`${name}`];
                                    const isochroneFeat = createFeature(path);
                                    geojson.features.push(isochroneFeat);
                                });
                            }
                        })
                    }
                    szenarioObject.geojson = geojson;

                    // add settings here
                    const personalSettings = {
                        type: $travelType,
                        value: emissDistance($travelType, $distance),
                        color: $activeColor
                    }

                    let settings = [];
                    settings.push(personalSettings);

                    if (isochrones && isochrones.length > 0) {
                        isochrones.map(name => {
                            settings.push({
                                type: name,
                                value: emissions[name],
                                color: 'red'
                            })
                        })
                    }
                    szenarioObject.widget.d = settings;
                });
            };

            getData();

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
