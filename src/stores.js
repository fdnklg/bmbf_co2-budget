import { writable, readable, derived } from 'svelte/store'
import {
  fetchJson,
  createSzenarioText,
  getDistanceProzent,
  getTime,
  getModel,
} from './utils'
import { getColorScale } from 'components/Widget/utils.js'
import { s3Url, isoChronesUrl, spaceTypes } from './config'
import { extent, legendText } from 'constants'
import {
  emissDistance,
  setsNew,
  emissions,
  divideEven,
  widgetColors,
} from 'components/Widget/utils.js'
import {
  createGeojson,
  createFeature,
  createCircle,
  createBoundingBox,
} from 'components/Map/util.js'
import { zoomLevels } from './constants'

export const activeWaypoint = writable(null)
export const activeVis = writable(null)
export const flightDistance = writable(null)

export const activeAnchor = writable('start')
export const activeCategory = writable(null)
export const data = writable(null)
export const travelType = writable('car')
export const travelTypeRides = writable('car')
export const distance = writable(50)
export const userInput = writable(false)
export const zipcodes = writable([])
export const activeZipcode = writable(41372)
export const isLocal = readable(false)

export const activeColor = derived(travelType, ($travelType) => {
  return '#f8f8f8'
})

let cache = {}

export const distancesData = derived(
  [activeZipcode],
  ([$activeZipcode], set) => {
    if ($activeZipcode) {
      // [distance, co2, x-, y-coordinates]
      const getData = async () => {
        const distances = await fetchJson(
          `${s3Url}distances/${parseInt($activeZipcode)}.json`
        )
        let data = []
        const cityKeys = Object.keys(distances.cities)
        cityKeys.map((city) => {
          const obj = distances.cities[city]
          data.push({
            city: city,
            distance: obj[0],
            co2: obj[1],
            lng: obj[2],
            lat: obj[3],
          })
        })
        data = data.sort((a, b) => a.distance - b.distance)
        data.unshift({
          isFlight: true,
        })
        set(data)
      }
      getData()
    }
  }
)

export const szenarienData = derived(
  [data, travelType, distance, activeZipcode],
  ([$data, $travelType, $distance, $activeZipcode], set) => {
    const szenarien = $data ? $data.szenarien : null
    if (szenarien) {
      // laden der externen Daten und Aufbereitung der Jsons
      const getData = async () => {
        // cache objekt -> lädt neue Daten, wenn cache jsonKey nicht in cache enthalten ist
        const jsonKey = `${$activeZipcode}-${$travelType}`
        if (!cache[jsonKey]) {
          const centroid = await fetchJson(
            `${s3Url}centroids/${parseInt($activeZipcode)}.json`
          )
          const isoJson = await fetchJson(
            `${isoChronesUrl}isochrones/${parseInt($activeZipcode)}_${$travelType}.json`
          )
          cache[jsonKey] = { centroid, isoJson }
        }

        const { centroid, isoJson } = cache[jsonKey]
        const { mobility, regiostar, airport } = centroid

        // iteriere über alle szenarien
        szenarien.map((szenario, i) => {
          // füge isochrone namen array zu daten objekt
          szenario.isochrones = setsNew[$travelType][i]
          szenario.centroid = centroid
          szenario.mobility = mobility
          szenario.airport = airport
          szenario.space = spaceTypes[regiostar]

          szenario.map.zoom = zoomLevels[`step-${szenario.step}`][$travelType]

          const { diameter, isochrones, space, step } = szenario

          // füge Texte zum Daten Objekt hinzu:
          const dProzent = getDistanceProzent($travelType, $distance, mobility)
          szenario.text = createSzenarioText(
            step,
            $travelType,
            $distance,
            space,
            dProzent
          )

          szenario.travelType = szenario.text.travelType

          // erstelle geojson
          const geojson = createGeojson()

          // füge features der isochrone/kreise (die im sets array liegen)in geojson
          if (szenario && isochrones) {
            let featuresToCut = []
            szenario.legend = {
              text: 'Deine Reisedistanz',
              values: [],
            }

            isochrones.map(({ iso }) => {
              let style

              if (iso) {
                const time = getTime(iso)
                const model = getModel(iso)
                const colorScale = getColorScale(time, model)
                const colorScaleContour = getColorScale(time, model, true)
                const e = emissions[iso]
                style = {
                  fill: colorScale(e),
                  'fill-opacity': 0.5,
                  stroke: colorScaleContour(e),
                  'stroke-opacity': 1,
                }

                const path = isoJson[`${iso}`]
                const isochroneFillFeat = createFeature(path, {
                  ...style,
                  id: 'iso-fill',
                })
                const isochroneContourFeat = createFeature(path, {
                  ...style,
                  id: 'iso-contour',
                })
                featuresToCut.push(isochroneFillFeat)
                geojson.features.push(isochroneFillFeat)
                geojson.features.push(isochroneContourFeat)

                const timeName = time == 2020 ? 'today' : 'future'
                let label = `${timeName}`

                if (model === 'min' || model === 'max') label += `_${model}`

                // add legend stuff here
                szenario.legend = {
                  text: legendText[timeName],
                  values: divideEven(...extent[label], 5).map((value) => ({
                    value: value,
                    label: `> ${value}`,
                    fill: colorScale(value),
                    stroke: colorScaleContour(value),
                  })),
                }
              } else if (!iso) {
                style = {
                  'fill-opacity': 0,
                  stroke: '#080e2f',
                  'stroke-opacity': 1,
                }
                const distCircle = createCircle(
                  [centroid.x, centroid.y],
                  $distance,
                  {
                    ...style,
                    id: 'distance',
                  }
                )
                geojson.features.push(distCircle)
                featuresToCut.push(distCircle)

                szenario.legend.values.push({
                  value: 'Deine Reisedistanz',
                  color: '#080e2f',
                })
              }

              // Füge Pulsing Dot hinzu
              geojson.features.push({
                type: 'Feature',
                properties: {
                  id: 'pulsingDot',
                },
                geometry: {
                  type: 'Point',
                  coordinates: [centroid.x, centroid.y],
                },
              })
            })

            // füge masken layer hinzu
            geojson.features.push(createBoundingBox(featuresToCut))
          }
          szenario.geojson = geojson

          // erstelle config für widget hier
          let settings = []

          isochrones.map(({ iso, highlight }) => {
            if (!iso) {
              // create data object for personal settings
              settings.push({
                type: $travelType,
                value: emissDistance($travelType, $distance),
                fill: highlight
                  ? widgetColors(`${$travelType}`)
                  : widgetColors(''),
                highlight: highlight ? highlight : false,
                showValue: highlight ? true : false,
                format: 'gram',
              })
            } else {
              // erstelle daten objekt für alle anderen elemente aus der config
              settings.push({
                type: !iso ? 'distance' : iso,
                value: emissions[iso],
                fill: highlight
                  ? widgetColors(`${$travelType}`)
                  : widgetColors(''),
                highlight: highlight ? highlight : false,
                showValue: true,
                format: 'gram',
              })
            }
          })

          const max = Math.max(...settings.map((item) => item.value))
          const percent = max / 100

          // berechne prozentwerte für jedes element
          settings = settings.map((item) => ({
            ...item,
            y: 1,
            x: item.value / percent,
          }))

          // summiere Anteile der anderen Emissionen
          let shareOthers = 0
          settings.map((item) => {
            if (item.value !== max) {
              shareOthers = shareOthers + item.value / percent
            }
          })

          if (isochrones && diameter) {
            // ziehe Werte der anderen ab von max Wert ab
            settings = settings
              .map((item) => {
                return {
                  ...item,
                  max: max === item.value ? true : false,
                  x: max === item.value ? item.x - shareOthers : item.x,
                  fill: item.highlight
                    ? widgetColors(item.type)
                    : widgetColors(''),
                }
              })
              .sort((a, b) => b.highlight - a.highlight)
          }

          if (isochrones) {
            // setze daten für annotation
            isochrones.map(({ iso, highlight, annotation }) => {
              const x = settings.find((item) => item.highlight).x
              if (highlight) {
                szenario.widget.annotation = {
                  label: annotation,
                  icon: $travelType,
                  x: x,
                  align: x > 50 ? 'right' : 'left',
                }
              }
            })
          }
          szenario.widget.d = settings
        })
        set($data.szenarien)
      }
      getData()
    }
  }
)

export const content = derived(
  [travelType, distance, activeZipcode],
  ([$travelType, $distance, $activeZipcode]) => {
    return {
      type: $travelType,
      distance: $distance,
      zip: $activeZipcode,
    }
  }
)

export const selectedAirport = derived(
  [szenarienData, data],
  ([$szenarienData, $data], set) => {
    if ($data && $szenarienData) {
      const airportId = $data.szenarien[0].airport
      const nearestAirport = $data.airports[airportId]
      set(nearestAirport)
    }
    return false
  }
)

export const randomAirport = derived(
  [szenarienData, data],
  ([$szenarienData, $data], set) => {
    if ($data && $szenarienData) {
      const randomAirport =
        $data.airports[parseInt(Math.random() * $data.airports.length - 1)]
      set(randomAirport)
    }
    return false
  }
)

export const szenarienDataActive = derived(
  [szenarienData, activeWaypoint, travelType],
  ([$szenarienData, $activeWaypoint], set) => {
    if ($szenarienData && $activeWaypoint) {
      set($szenarienData[$activeWaypoint])
    }
  }
)

export const selectedData = derived(
  [data, activeCategory],
  ([$data, $activeCategory]) => {
    if ($activeCategory && $data) {
      return $data.emissions[$activeCategory]
    }
  }
)
