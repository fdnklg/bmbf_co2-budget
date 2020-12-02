<script>
  import { onMount, afterUpdate, setContext, onDestroy } from "svelte";
  import {
    activeZipcode,
    travelType,
    activeColor,
    distance,
    szenarienData,
  } from "stores";
  import { mapbox, key } from "./mapbox.js";
  import { s3Url } from "config";
  import { createGeojson, createFeature, createCircle } from "./util";
  import { isoChronesUrl } from "../../config.js";

  let map;

  setContext(key, {
    getMap: () => map,
  });

  export let lat;
  export let lon;
  export let zoom;

  let container, activeIsochrone, activeGeoJson;

  $: {
    if (activeIsochrone && map) {
      const scenario = 2020;
      const travelKey = `${$travelType}_${scenario}`;
      const currentFeature = activeIsochrone[travelKey];

      if (currentFeature) {
        const geoJson = createFeature(currentFeature);
        activeGeoJson = geoJson;

        const source = map.getSource("isochrone");
        if (source) {
          // set new data for map if new feature is available
          map.getSource("isochrone").setData(geoJson);
          map.setPaintProperty("iso", "fill-color", $activeColor);
          console.log("activeIsochrone", geoJson);
        }
      }
    }
  }

  const fetchJson = async (path) => {
    const res = await fetch(path);
    const json = await res.json();
    return json;
  };

  onMount(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/mapbox-gl/dist/mapbox-gl.css";

    link.onload = () => {
      map = new mapbox.Map({
        container,
        style: "mapbox://styles/mapbox/streets-v9",
        center: [lon, lat],
        zoom,
        scrollZoom: false,
      });

      map.on("load", () => {
        map.addSource("isochrone", { type: "geojson", data: createGeojson() });

        map.addLayer({
          id: "distance",
          type: "fill",
          source: "isochrone",
          paint: {
            "fill-color": $activeColor,
            "fill-opacity": 0.4,
          },
          filter: ["==", "$type", "Polygon"],
        });

        map.addLayer({
          id: "car",
          type: "fill",
          source: "isochrone",
          paint: {
            "fill-color": "orange",
            "fill-opacity": 0,
          },
          filter: ["==", "$type", "Polygon"],
        });

        map.addLayer({
          id: "public",
          type: "fill",
          source: "isochrone",
          paint: {
            "fill-color": "green",
            "fill-opacity": 0,
          },
          filter: ["==", "$type", "Polygon"],
        });
      });
    };

    document.head.appendChild(link);

    return () => {
      map.remove();
      link.parentNode.removeChild(link);
    };
  });

  //   prepare data fetch inside after update!
  afterUpdate(async () => {
    if ($szenarienData && map) {
      // data fetch
      const { diameter, zipcode, zoom, isochrones, scenario } = $szenarienData;
      const centroid = await fetchJson(
        `${s3Url}centroids/${$activeZipcode}.json`
      );

      const isochroneJson = await fetchJson(
        `${isoChronesUrl}isochrones/${zipcode}_${$travelType}.json`
      );

      const { x, y } = centroid;
      const geojson = createGeojson();

      //   draw circle
      if (diameter) {
        geojson.features.push(createCircle([x, y], $distance));
      }

      //   set isochrones
      if (isochrones && isochrones.length > 0) {
        const path = isochroneJson[`${$travelType}_${scenario}`];
        const isochroneFeat = createFeature(path);
        geojson.features.push(isochroneFeat);
      }

      const source = map.getSource("isochrone");

      if (source) {
        //   update map props
        source.setData(geojson);
        map.setPaintProperty("distance", "fill-color", $activeColor);
        map.setPaintProperty("car", "fill-color", "black");
        map.setPaintProperty("public", "fill-color", "white");
      }

      map.flyTo({
        center: [centroid.x, centroid.y],
        zoom: zoom,
      });
    }
  });
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
