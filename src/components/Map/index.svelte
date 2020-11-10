<script>
  import { onMount, setContext, onDestroy } from "svelte";
  import { mapbox, key } from "./mapbox.js";
  import { activeVisItem } from "stores";
  import { items } from "content";

  setContext(key, {
    getMap: () => map,
  });

  export let lat;
  export let lon;
  export let zoom;

  let container;
  let map;

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
    };

    document.head.appendChild(link);

    return () => {
      map.remove();
      link.parentNode.removeChild(link);
    };
  });

  const subscribeActiveMapItem = activeVisItem.subscribe((newActiveMapItem) => {
    if (map) {
      map.flyTo({
        center: items[newActiveMapItem].coordinates,
        zoom: items[newActiveMapItem].zoom,
      });
    }
  });

  onDestroy(subscribeActiveMapItem);
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
