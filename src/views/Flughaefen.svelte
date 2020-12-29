<script>
  import { data } from "stores";
  import distance from "@turf/distance";
  import { point } from "@turf/helpers";

  import Select from "components/Select.svelte";
  import Loading from "components/Loading.svelte";

  $: airports = $data ? $data.airports : null;

  let start = null;
  let destination = null;

  function handleStart(e) {
    start = airports.find((d) => d.id === e.detail);
    getDistance();
  }

  function handleDestination(e) {
    destination = airports.find((d) => d.id === e.detail);
    getDistance();
  }

  function getDistance() {
    if (start && destination) {
      const startPoint = point([parseFloat(start.lng), parseFloat(start.lat)]);
      const destPoint = point([
        parseFloat(destination.lng),
        parseFloat(destination.lat),
      ]);
      const dist = distance.default(startPoint, destPoint);
      return dist;
    }
  }
</script>

<style lang="scss">
</style>

<div class="container">
  {#if airports}
    <Select on:start={handleStart} event="start" items={airports} />
    <Select
      on:destination={handleDestination}
      event="destination"
      items={airports} />
  {:else}
    <Loading />
  {/if}
</div>
