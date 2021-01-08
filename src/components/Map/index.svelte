<script>
  import { onMount, beforeUpdate, afterUpdate, setContext } from 'svelte'
  import { pulsingDot } from './pulsingDot'

  import { mapbox, key } from './mapbox.js'
  import { createGeojson } from './util'

  export let hasPulsingDot
  export let data
  export let animate
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
          id: 'isoFills',
          type: 'fill',
          source: 'layers',
          paint: {
            'fill-color': ['get', 'fill'],
            'fill-opacity': ['get', 'fill-opacity'],
          },
          filter: ['==', 'id', 'iso-fill'],
        })

        map.addLayer({
          id: 'boundingFill',
          type: 'fill',
          source: 'layers',
          paint: {
            'fill-color': ['get', 'fill'],
            'fill-opacity': ['get', 'fill-opacity'],
          },
          filter: ['==', 'id', 'bounding-box'],
        })

        map.addLayer({
          id: 'isoContours',
          type: 'line',
          source: 'layers',
          paint: {
            'line-color': ['get', 'stroke'],
            'line-opacity': 0,
            'line-width': 1,
          },
          filter: ['==', 'id', 'iso-contour'],
        })

        map.addLayer({
          id: 'dist',
          type: 'line',
          source: 'layers',
          paint: {
            'line-color': ['get', 'stroke'],
            'line-dasharray': [2, 3],
            'line-opacity': 1,
            'line-width': 1,
          },
          filter: ['==', 'id', 'distance'],
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
              'icon-size': 0.6,
            },
            filter: ['==', '$type', 'Point'],
          })

          map.addImage('pulsing-dot', pulsingDot(map, 200, 'rgba(0,0,0,1)'), {
            pixelRatio: 2,
          })

          /*

          Expressions in MapboxGLJS
          https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/
          https://docs.mapbox.com/help/tutorials/mapbox-gl-js-expressions/

          What is the name of this?
          Expressions

          What kind of operators do exist?
          String, Logical, Camera, Data, Mathmatical

          What are the existing operators?
          get, has, id, geometry-type, properties, feature-state

          Where can expressions be used?
          layout, paint, filter property of Layers

          What is the syntax?
          Lisp-like syntax, represented using JSON arrays
          [expression_name, argument_0, argument_1, ...]

          How can expressions appear?
          - Expressions expect n arguments, depending on the expression
          - Arguments of expressions can be another expression that takes arguments

          How to create a valid expression?
          Check what argument the expression expects.
          Define how your layers shall work.

          */
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
      const { geojson } = data

      const { centroid, travelType } = data
      const zoom = data.map.zoom

      const source = map.getSource('layers')

      if (source) {
        source.setData(geojson)
        map.setLayoutProperty('icons', 'icon-image', travelType)

        // if (animate) {
        //   map.setPaintProperty('isoContours', 'line-opacity', 0)
        //   map.setPaintProperty('isochrones', 'fill-opacity', 0)

        //   setTimeout(() => {
        //     map.setPaintProperty('isochrones', 'fill-opacity', 0.75)
        //     map.setPaintProperty('isoContours', 'line-opacity', 1)
        //   }, 500)

        //   setTimeout(() => {
        //     map.setPaintProperty('isochrones', 'fill-opacity', 0)
        //     map.setPaintProperty('isoContours', 'line-opacity', 0)
        //   }, 3500)
        // } else {

        map.setPaintProperty('dist', 'line-opacity', ['get', 'stroke-opacity'])

        map.setPaintProperty('isoFills', 'fill-opacity', [
          'get',
          'fill-opacity',
        ])

        map.setPaintProperty('isoContours', 'line-opacity', [
          'get',
          'stroke-opacity',
        ])
        // }
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
