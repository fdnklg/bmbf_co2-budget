import { writable, readable, derived } from 'svelte/store';
import { lightenColor, fetchJson } from './utils';
import { s3Url, isoChronesUrl, colors } from './config';
import { emissDistance, sets, setsNew, emissions, widgetColors } from 'components/Widget/utils.js';
import { createGeojson, createFeature, createCircle, createBoundingBox } from "components/Map/util.js";

export const activeWaypoint = writable(null);
export const activeVis = writable(null);

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
        return colors[$travelType];
    }
)

/*
es sollte ein objekt geben, welches alle json-daten enthält, die bereits geladen wurden.
wenn das json nicht nicht enthalten ist, soll es hineingeschrieben werden.
wenn es schon enthalten ist, dann soll kein json geladen werden und stattdessen das json im cache objekt geladen werden.
das cache objekt kann in stores.js liegen
*/

let cache = {}

export const szenarienData = derived(
    [data, travelType, distance, activeZipcode, activeWaypoint],
    ([$data, $travelType, $distance, $activeZipcode], set) => {
        if ($data) {
            const szenarienKeys = Object.keys($data.szenarien);

            //
            // laden der externen Daten und Aufbereitung der Jsons
            //

            console.log('cache', cache)

            const getData = async () => {

                // cache objekt -> lädt neue Daten, wenn cache jsonKey nicht in cache enthalten ist
                const jsonKey = `${$activeZipcode}-${$travelType}`;
                if (!cache[jsonKey]) {
                    const centroid = await fetchJson(`${s3Url}centroids/${$activeZipcode}.json`);
                    const isoJson = await fetchJson(`${isoChronesUrl}isochrones/${$activeZipcode}_${$travelType}.json`);
                    cache[jsonKey] = {centroid, isoJson}
                }

                const { centroid, isoJson } = cache[jsonKey];
                
                // iteriere über alle szenarien
                szenarienKeys.map((szenario, i) => {
                    // füge isochrone namen array zu daten objekt
                    const szenarioObject = $data.szenarien[szenario];
                    szenarioObject.isochrones = setsNew[$travelType][i];
                    szenarioObject.centroid = centroid;

                    const { diameter, isochrones } = szenarioObject;

                    // erstelle geojson
                    const geojson = createGeojson();

                    // füge features der isochrone/kreise (die im sets array liegen)in geojson
                    if (szenarioObject && isochrones) {
                        let featuresToCut = [];
                        isochrones.map(({ iso, highlight }) => {
                            
                            // definiere stil des geojson als style objekt, was später übergeben wird
                            // @TODO: Style Funkion die alle Fälle abdeckt
                            const style = {
                                "fill": highlight ? widgetColors(`${$travelType}_`) : widgetColors('_'),
                                "fill-opacity": highlight ? 0.5 : 0.1,
                                "stroke": widgetColors(`${$travelType}_`),
                                "stroke-opacity": 1,
                            }; 


                            if (iso) {
                                const path = isoJson[`${iso}`];
                                const isochroneFeat = createFeature(path, style);
                                featuresToCut.push(isochroneFeat);
                                geojson.features.push(isochroneFeat);
                            }
                            
                            if (!iso){
                                const distCircle = createCircle([centroid.x, centroid.y], $distance, style);
                                geojson.features.push(distCircle);
                                featuresToCut.push(distCircle);
                            }

                        })
                        geojson.features.push(createBoundingBox(featuresToCut));
                    }
                    szenarioObject.geojson = geojson;

                    //
                    // erstelle config für widget hier
                    //

                    let settings = [];
                        
                    isochrones.map(({ iso, highlight }) => {
                        if (!iso) {
                            // create data object for personal settings
                            settings.push({
                                type: $travelType,
                                value: emissDistance($travelType, $distance),
                                fill: highlight ? widgetColors(`${$travelType}`) : widgetColors(''),
                                highlight: highlight ? highlight : false,
                                showValue: highlight ? true : false,
                                format: 'gram',
                            })
                        } else {
                            // erstelle daten objekt für alle anderen dinge
                            settings.push({
                                type: !iso ? 'distance' : iso,
                                value: emissions[iso],
                                fill: highlight ? widgetColors(`${$travelType}`) : widgetColors(''),
                                highlight: highlight ? highlight : false,
                                showValue: true,
                                format: 'gram',
                            })
                        }
                    })
                    
                    const max = Math.max(...settings.map(item => item.value));
                    const percent = max / 100;

                    // berechne prozentwerte für jedes element
                    settings = settings.map(item => ({ ...item, y: 1, x: item.value / percent }))
                    
                    // summiere Anteile der anderen Emissionen
                    let shareOthers = 0;
                    settings.map(item => {
                        if (item.value !== max) {
                            shareOthers = shareOthers + (item.value / percent);
                        }
                    });

                    if (isochrones && diameter) {
                        // ziehe Werte der anderen ab von max Wert ab
                        settings = settings.map(item => {
                            return {
                                ...item,
                                max: max === item.value ? true : false,
                                x: max === item.value ? item.x - shareOthers : item.x,
                                fill: item.highlight ? widgetColors(item.type) : widgetColors('')
                            }
                        }
                        ).sort((a,b) => b.highlight - a.highlight)
                    }
                    
                    if (isochrones) {
                        // setze daten für annotation
                        isochrones.map(({ iso, highlight, annotation }) => {
                            const x = settings.find(item => item.highlight).x;
                            if (highlight) {
                                szenarioObject.widget.annotation = {
                                    label: annotation,
                                    icon: $travelType,
                                    x: x,
                                    align: x > 50 ? 'right' : 'left'
                                }
                            }
                        })
                    }
                    szenarioObject.widget.d = settings;
                });
                set($data.szenarien);
            };
            getData();
        }

    }
)


export const szenarienDataActive = derived(
    [szenarienData, activeWaypoint, travelType],
    ([$szenarienData, $activeWaypoint], set) => {
        if ($szenarienData && $activeWaypoint) {
            set($szenarienData[$activeWaypoint]);
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
