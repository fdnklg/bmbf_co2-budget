<script>
  import { onMount, beforeUpdate, setContext, onDestroy } from "svelte";
  import { activeColor, szenarienDataActive } from "stores";

  import { mapbox, key } from "./mapbox.js";
  import { createGeojson } from "./util";

  let map;

  setContext(key, {
    getMap: () => map,
  });

  export let lat;
  export let lon;
  export let zoom;

  let container;

  onMount(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/mapbox-gl/dist/mapbox-gl.css";

    link.onload = () => {
      map = new mapbox.Map({
        container,
        style: "mapbox://styles/fdnklg/cki1gf6nl3fpj19mvtr8k06en",
        center: [lon, lat],
        zoom,
        scrollZoom: false,
      });

      map.on("load", () => {
        map.addSource("layers", { type: "geojson", data: createGeojson() });

        map.addLayer({
          id: "isochrones",
          type: "fill",
          source: "layers",
          paint: {
            "fill-color": ["get", "fill"],
            "fill-opacity": ["get", "fill-opacity"],
          },
        });

        map.addLayer({
          id: "isoContours",
          type: "line",
          source: "layers",
          paint: {
            "line-color": ["get", "stroke"],
            "line-opacity": ["get", "stroke-opacity"],
            "line-width": 1,
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

  //   prepare data fetch inside after update!
  beforeUpdate(async () => {
    if ($szenarienDataActive && map) {
      const geojson = $szenarienDataActive.geojson;
      const { zoom, centroid } = $szenarienDataActive;

      const source = map.getSource("layers");

      if (source) {
        source.setData(geojson);
        // map.setPaintProperty("isochrones", "fill-color", $activeColor);
      }

      if (centroid)
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
