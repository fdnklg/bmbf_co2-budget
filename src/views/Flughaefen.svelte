<script>
  import { distancesData, szenarienData } from 'stores'
  import { travelTypesRides, airportsIntro } from 'config'
  import { afterUpdate } from 'svelte'
  import { data } from 'stores'
  import distance from '@turf/distance'
  import { point } from '@turf/helpers'

  import Select from 'components/Select.svelte'
  import Intro from 'components/SelectGroup/Intro.svelte'
  import SelectGroup from 'components/SelectGroup/index.svelte'
  import Loading from 'components/Loading.svelte'
  import Tile from 'components/Tile.svelte'
  import ChartFahrten from '../components/ChartFahrten.svelte'

  $: airports = $data ? $data.airports : null
  $: start = null
  $: width = null
  $: destination = null
  $: flightDistance = getDistance(start, destination)
  $: loaded = airports && $distancesData ? true : false
  $: centroid = null

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
    if ($szenarienData) {
      centroid = $data.szenarien[0].centroid
    }
  })
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .container {
    margin: auto;

    @include respond-max-screen-phablet {
      width: calc(100% - 20px);
      margin-left: 10px;
    }
  }

  .select-group {
    width: 100%;
    margin-bottom: 30px;
  }
  .distances {
  }
</style>

<div class="container">
  {#if loaded}
    <Tile large={true} active={true}>
      <div class="select-group inner">
        <Intro title={airportsIntro.title} subtitle={airportsIntro.subtitle} />
        <Select on:start={handleStart} event="start" items={airports} />
        <Select
          on:destination={handleDestination}
          event="destination"
          items={airports} />
      </div>
      <SelectGroup
        data={travelTypesRides}
        last={true}
        isType="travelTypeRides" />
    </Tile>
    <div bind:this={distancesRef} class="distances inner">
      {#if flightDistance && width && $distancesData}
        {#each $distancesData as city}
          <ChartFahrten
            start={centroid.name}
            {width}
            distance={flightDistance}
            airports={{ start: start, destination: destination }}
            data={city} />
        {/each}
      {/if}
    </div>
  {:else}
    <Loading />
  {/if}
</div>