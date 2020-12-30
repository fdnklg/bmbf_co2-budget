<script>
  import { distancesData } from 'stores'
  import { afterUpdate } from 'svelte'
  import { data } from 'stores'
  import distance from '@turf/distance'
  import { point } from '@turf/helpers'

  import Select from 'components/Select.svelte'
  import Loading from 'components/Loading.svelte'
  import Tile from 'components/Tile.svelte'
  import ChartFahrten from '../components/ChartFahrten.svelte'

  $: airports = $data ? $data.airports : null
  $: start = null
  $: width = null
  $: destination = null
  $: flightDistance = getDistance(start, destination)
  $: loaded = airports && $distancesData ? true : false

  let distancesRef

  function handleStart(e) {
    start = airports.find((d) => d.id === e.detail)
  }

  function handleDestination(e) {
    destination = airports.find((d) => d.id === e.detail)
  }

  function getDistance(start, dest) {
    if (start && dest) {
      const startPoint = point([parseFloat(start.lng), parseFloat(start.lat)])
      const destPoint = point([
        parseFloat(destination.lng),
        parseFloat(destination.lat),
      ])
      const dist = distance.default(startPoint, destPoint)
      return dist
    }
    return false
  }

  afterUpdate(() => {
    width = distancesRef ? distancesRef.getBoundingClientRect().width : null
  })
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .container {
    margin: auto;
  }
  .distances {
  }
</style>

<div class="container">
  {#if loaded}
    <Tile active={true}>
      <div class="inner">
        <Select on:start={handleStart} event="start" items={airports} />
        <Select
          on:destination={handleDestination}
          event="destination"
          items={airports} />
      </div>
    </Tile>
    <div bind:this={distancesRef} class="distances inner">
      {#if flightDistance && width}
        {#each $distancesData as city}
          <ChartFahrten {width} distance={flightDistance} data={city} />
        {/each}
      {/if}
    </div>
  {:else}
    <Loading />
  {/if}
</div>
