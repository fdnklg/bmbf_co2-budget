<script>
  import { onMount, setContext, onDestroy } from "svelte";
  import { activeZipcode, travelType, activeColor } from "stores";
  import { mapbox, key } from "./mapbox.js";
  import { s3Url } from "config";
  import { createGeoJson } from "./util";
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
        const geoJson = createGeoJson(currentFeature);
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
        map.addSource("isochrone", { type: "geojson", data: activeGeoJson });

        map.addLayer({
          id: "iso",
          type: "fill",
          source: "isochrone",
          layout: {},
          paint: {
            "fill-color": "red",
            "fill-opacity": 0.4,
          },
        });
      });
    };

    document.head.appendChild(link);

    return () => {
      map.remove();
      link.parentNode.removeChild(link);
    };
  });

  const subscribeTravelType = travelType.subscribe(async () => {
    const isochrone = await fetchJson(
      `${isoChronesUrl}isochrones/${$activeZipcode}_${$travelType}.json`
    );

    activeIsochrone = isochrone;
  });

  const subscribeActiveZipcode = activeZipcode.subscribe(async () => {
    const centroid = await fetchJson(
      `${s3Url}centroids/${$activeZipcode}.json`
    );

    const isochrone = await fetchJson(
      `${isoChronesUrl}isochrones/${$activeZipcode}_${$travelType}.json`
    );

    if (map) {
      map.flyTo({
        center: [centroid.x, centroid.y],
        zoom: 5,
      });
    }

    activeIsochrone = isochrone;
  });

  onDestroy(subscribeActiveZipcode);
  onDestroy(subscribeTravelType);
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
