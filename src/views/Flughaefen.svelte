<script>
  import {
    distancesData,
    szenarienData,
    selectedAirport,
    randomAirport,
  } from 'stores'
  import { travelTypesRides, airportsIntro } from 'config'
  import { afterUpdate } from 'svelte'
  import { data } from 'stores'
  import distance from '@turf/distance'
  import { point } from '@turf/helpers'

  import Select from 'components/Select.svelte'
  import Intro from 'components/SelectGroup/intro.svelte'
  import SelectGroup from 'components/SelectGroup/index.svelte'
  import Loading from 'components/Loading.svelte'
  import Tile from 'components/Tile.svelte'
  import ChartFahrten from '../components/ChartFahrten.svelte'

  travelTypesRides.elements.map((d) => {
    if (d.label === 'ÖPNV') {
      d.label = 'Zug'
    }
    return d
  })
  $: airports = $data ? $data.airports : null
  $: start = null
  $: width = null
  $: destination = null
  $: flightDistance = getDistance(start, destination)
  $: filteredCities = $distancesData
    ? getFiltered(flightDistance, $distancesData)
    : null
  $: loaded = airports && $distancesData ? true : false
  $: centroid = null

  let distancesRef
  function handleStart(e) {
    start = airports.find((d) => d.id === e.detail)
  }

  function handleDestination(e) {
    destination = airports.find((d) => d.id === e.detail)
  }

  function indexOfClosest(nums, target) {
    let closest = Number.MAX_SAFE_INTEGER
    let index = 0
    nums.forEach((num, i) => {
      let dist = Math.abs(target - num)

      if (dist < closest) {
        index = i
        closest = dist
      }
    })
    return index
  }

  function getFiltered(distance, cities) {
    let citiesToMatch = [...cities]
    let closest = [{ isFlight: true }]
    if (cities) {
      for (let index = 0; index < 3; index++) {
        const closestIndex = indexOfClosest(
          citiesToMatch.map((c) => c.distance),
          distance
        )
        closest.push(citiesToMatch[closestIndex])
        citiesToMatch.splice(closestIndex, 1) // remove closest distance from array
      }
      return closest
    }
    return closest
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
    if ($szenarienData && $randomAirport) {
      centroid = $data.szenarien[0].centroid
      destination = $randomAirport
    }
  })
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .container {
    margin: auto;

    @include respond-max-screen-phablet {
      width: calc(100% - 2em);
      margin-left: 10px;
      margin: auto;
    }
  }

  .label {
    color: $color-main-60;
    margin-bottom: 5px;
  }

  .select-group {
    width: 100%;
    margin-bottom: 30px;
  }

  .wrapper {
    padding-top: 40px;
    margin: auto;
    max-width: 550px;
    width: 100%;
  }
</style>

<div class="container">
  {#if loaded}
    <Tile large={true} active={true}>
      <div class="select-group inner">
        <Intro title={airportsIntro.title} subtitle={airportsIntro.subtitle} />
        <span class="label">Startflughafen</span>
        <Select
          selected={$selectedAirport}
          on:start={handleStart}
          event="start"
          items={airports} />
        <span class="label">Zielflughafen</span>
        <Select
          selected={destination}
          on:destination={handleDestination}
          event="destination"
          items={airports} />
      </div>
      <SelectGroup
        data={travelTypesRides}
        last={true}
        isType="travelTypeRides" />
    </Tile>
    <div bind:this={distancesRef} class="distances wrapper">
      {#if flightDistance && width && $distancesData}
        {#each filteredCities as city}
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
