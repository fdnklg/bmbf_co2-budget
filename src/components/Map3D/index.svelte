<script>
  import { onMount, afterUpdate, setContext } from 'svelte'
  import { mapbox, key } from './mapbox.js'
  let map

  setContext(key, {
    getMap: () => map,
  })

  let container

  onMount(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/mapbox-gl/dist/mapbox-gl.css'

    link.onload = () => {
      map = new mapbox.Map({
        container,
        zoom: 13.1,
        center: [13.404, 52.520008],
        pitch: 85,
        bearing: 80,
        interactive: true,
        style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y',
      })

      map.on('load', () => {
        map.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14,
        })
        map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 })
        map.addLayer({
          id: 'sky',
          type: 'sky',
          paint: {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 15,
          },
        })
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
    // if (data && map) {
    //   const { geojson } = data
    //   const { centroid, travelType } = data
    //   const zoom = data.map.zoom
    //   const source = map.getSource('layers')
    //   if (source) {
    //     source.setData(geojson)
    //   }
    //   if (centroid) {
    //     map.flyTo({
    //       center: [centroid.x, centroid.y],
    //       zoom: zoom,
    //     })
    //     projected = map.project([centroid.x, centroid.y])
    //     tType = travelType
    //   }
    // }
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
