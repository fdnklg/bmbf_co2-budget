<script>
  import { onMount, beforeUpdate, afterUpdate, setContext } from 'svelte'
  import { pulsingDot } from './pulsingDot'

  import { mapbox, key } from './mapbox.js'
  import { createGeojson } from './util'

  export let hasPulsingDot
  export let data
  let map

  setContext(key, {
    getMap: () => map,
  })

  export let lat
  export let lon
  export let zoom

  let container
  $: tType = 'bike'

  onMount(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/mapbox-gl/dist/mapbox-gl.css'

    link.onload = () => {
      map = new mapbox.Map({
        container,
        style: 'mapbox://styles/fdnklg/ckj0fopmu8mbs19qkhuu3fx77',
        center: [lon, lat],
        zoom,
        scrollZoom: false,
      })

      map.on('load', () => {
        map.addSource('layers', { type: 'geojson', data: createGeojson() })

        map.addLayer({
          id: 'isochrones',
          type: 'fill',
          source: 'layers',
          paint: {
            'fill-color': ['get', 'fill'],
            'fill-opacity': ['get', 'fill-opacity'],
          },
        })

        map.addLayer({
          id: 'isoContours',
          type: 'line',
          source: 'layers',
          paint: {
            'line-color': ['get', 'stroke'],
            'line-opacity': ['get', 'stroke-opacity'],
            'line-width': 1,
          },
        })

        if (hasPulsingDot) {
          map.addLayer({
            id: 'points',
            type: 'symbol',
            source: 'layers',
            layout: {
              'icon-image': 'pulsing-dot',
            },
            filter: ['==', '$type', 'Point'],
          })

          map.addLayer({
            id: 'icons',
            type: 'symbol',
            source: 'layers',
            layout: {
              'icon-image': tType,
              'icon-size': 0.75,
            },
            filter: ['==', '$type', 'Point'],
          })

          map.addImage('pulsing-dot', pulsingDot(map, 200, 'rgba(0,0,0,1)'), {
            pixelRatio: 2,
          })
        }
      })
    }

    document.head.appendChild(link)

    return () => {
      map.remove()
      link.parentNode.removeChild(link)
    }
  })

  // prepare data fetch inside after update!
  afterUpdate(async () => {
    if (data && map) {
      console.log('afterUpdate', data)
      const { geojson } = data

      const { centroid, travelType } = data
      const zoom = data.map.zoom

      const source = map.getSource('layers')

      console.log('source', source)
      if (source) {
        source.setData(geojson)
        map.setLayoutProperty('icons', 'icon-image', travelType)
      }

      if (centroid) {
        map.flyTo({
          center: [centroid.x, centroid.y],
          zoom: zoom,
        })

        tType = travelType
      }
    }
  })
</script>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>

<div bind:this={container}>
  {#if map}
    <slot />
  {/if}
</div>
