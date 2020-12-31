<script>
  import { afterUpdate } from 'svelte'
  import { travelTypeRides } from 'stores'
  import { travelTypesRides } from 'config'
  import { co2PerKm, colors } from 'constants'

  import Loading from 'components/Loading.svelte'
  import Chart from './Chart/Chart.svelte'
  import Bars from './Chart/Bars.svelte'
  import Annotation from './Chart/Annotation.svelte'

  export let data
  export let distance
  export let start
  export let width

  let transformedData = false
  let travelLabel = ''

  function getPercentPerBar(rides, width) {
    const spacesPx = rides - 1
    const percentInPx = width / 100
    const percent = spacesPx / percentInPx
    const percentPerBar = percent / rides
    return percentPerBar
  }

  function transformData(data, width) {
    const distanceAirport = data.distance
    const co2Plane = distance * co2PerKm.plane // gram
    const co2Travel = distanceAirport * co2PerKm[$travelTypeRides] // co2 for distance to selected traveltype and start airport
    const rides = parseInt(co2Plane / co2Travel)
    const barSlice = 100 / rides

    const labelObject = getTravelTypeLabel($travelTypeRides, travelTypesRides)
    const label = rides > 1 ? labelObject.plural : labelObject.singular

    const marginPerBar = getPercentPerBar(rides, width)

    let arr = Array.from(Array(rides).keys())
    arr = arr.map((d, i) => ({
      value: barSlice,
      x: barSlice - marginPerBar,
      format: 'percent',
      fill:
        i === 0
          ? colors[$travelTypeRides].main
          : colors[$travelTypeRides].light,
      showLabel: false,
      showValue: false,
    }))
    return {
      ...data,
      rides,
      travelLabel: label,
      co2Plane,
      data: arr,
      annotation: {
        label: `Hin- und Rückfahrt stößt insgesamt ${
          data.co2 / 1000
        } kg CO2 aus.`,
      },
    }
  }

  function getTravelTypeLabel(travelType, data) {
    console.log(data)
    return data.elements.find((d) => d.value === travelType).ride
  }

  const meta = {
    source: {
      label: 'Europäische Umweltagentur',
      url: 'https://www.europarl.europa.eu/',
    },
  }

  afterUpdate(() => {
    transformedData = transformData(data, width)
  })
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .fahrt {
    margin: 30px 0 70px;
    max-width: 768px;

    @include respond-max-screen-phablet {
      width: 100%;
      max-width: auto;
    }
  }

  .wrapper {
    margin-bottom: 30px;
    width: auto;
  }

  .chart-header {
    display: flex;
    padding-bottom: 5px;
  }
  .rides {
    font-size: $font-size-xl;
    display: flex;
    margin-right: 8px;
    align-items: center;
    justify-content: center;
  }

  .details {
    display: flex;
    flex-direction: column;
    line-height: 130%;
    .description {
      color: $color-main-40;
    }

    .journey {
      color: $color-main;
      font-family: 'Post Grotesk Bold';
    }
  }
</style>

<div class="fahrt">
  {#if transformedData}
    <div class="chart-header">
      <div class="rides">{transformedData.rides}</div>
      <div class="details">
        <span class="description">{transformedData.travelLabel} zwischen</span>
        <span class="journey">{start} und {transformedData.city}</span>
      </div>
    </div>
    <div class="wrapper">
      <Chart x1={0} x2={100} y1={0} y2={100}>
        <Annotation flip={false} data={transformedData.annotation} />
        <Bars data={transformedData.data} />
      </Chart>
    </div>
    <!-- <Footer data={meta} /> -->
  {:else}
    <Loading />
  {/if}
</div>
