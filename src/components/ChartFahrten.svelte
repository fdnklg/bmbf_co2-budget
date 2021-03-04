<script>
  import { afterUpdate } from 'svelte'
  import { travelTypeRides } from 'stores'
  import { travelTypesRides } from 'config'
  import { co2PerKm, colors } from 'constants'
  import { formattedNumber } from 'utils'

  import Loading from 'components/Loading.svelte'
  import Chart from './Chart/Chart.svelte'
  import Bars from './Chart/Bars.svelte'
  import Annotation from './Chart/Annotation.svelte'

  export let data
  export let distance
  export let start
  export let airports
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

  function addFlightData() {
    const co2Plane = distance * (co2PerKm.plane * 2) // 2! rides in gram
    return {
      rides: 1,
      travelLabel: 'Flug',
      journey: {
        start: airports.start.name,
        destination: airports.destination.name,
      },
      data: [
        {
          value: 100,
          x: 100,
          align: 'right',
          textAlign: 'right',
          format: 'percent',
          fill: colors.plane.main,
          showLabel: false,
          showValue: false,
        },
      ],
      annotation: {
        label: `Hin- und Rückflug stoßen insgesamt <span class="annotation-label plane">${formattedNumber(
          ',.1f',
          co2Plane / 1000
        )}&thinsp;kg</span> CO₂ aus. <span class="addition">(${formattedNumber(
          ',.1f',
          distance
        )}&thinsp;km / Fahrt)</span>`,
        x: 100,
        align: 'right',
        textAlign: 'right',
      },
    }
  }

  function transformData(data, width) {
    const distanceAirport = data.distance
    const co2Plane = parseFloat((distance * (co2PerKm.plane * 2)).toFixed(1)) // 2! rides in gram
    const co2Travel = distanceAirport * co2PerKm[$travelTypeRides] * 2 // co2 for distance to selected traveltype and start airport
    const rides = parseInt(co2Plane / co2Travel)
    const barSlice = 100 / rides

    const labelObject = getTravelTypeLabel($travelTypeRides, travelTypesRides)
    const label = rides > 1 ? labelObject.plural : labelObject.singular

    const marginPerBar = getPercentPerBar(rides, width)

    let arr = Array.from(Array(rides).keys())
    arr = arr.map((d, i) => ({
      value: barSlice,
      x: barSlice - marginPerBar,
      align: barSlice - marginPerBar < 50 ? 'left' : 'right',
      textAlign: barSlice - marginPerBar < 50 ? 'left' : 'right',
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
      journey: {
        start: start,
        destination: data.city,
      },
      data: arr,
      annotation: {
        x: barSlice - marginPerBar,
        align: barSlice - marginPerBar < 50 ? 'left' : 'right',
        textAlign: barSlice - marginPerBar < 50 ? 'left' : 'right',
        label: `Hin- und Rück${
          label === 'Flug' ? 'flug' : 'fahrt'
        } stößt insgesamt <span class="annotation-label ${$travelTypeRides}">${formattedNumber(
          ',.1f',
          co2Travel / 1000
        )}&thinsp;kg</span> CO₂ aus. <span class="addition">(${formattedNumber(
          ',.1f',
          data.distance
        )}&thinsp;km / ${label === 'Flug' ? 'Flug' : 'Fahrt'})</span>`,
      },
    }
  }

  function getTravelTypeLabel(travelType, data) {
    return data.elements.find((d) => d.value === travelType).ride
  }

  const meta = {
    source: {
      label: 'Europäische Umweltagentur',
      url: 'https://www.europarl.europa.eu/',
    },
  }

  afterUpdate(() => {
    transformedData = data.isFlight
      ? addFlightData()
      : transformData(data, width)
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

  :global(.annotation-label) {
    font-family: 'Post Grotesk Bold';
    border-radius: 3px;
    padding: 1px 4px;
    white-space: nowrap;
    @include travel-type-color(background-color, $light: true);
    @include travel-type-color(color, $light: false);
    color: white;
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
    font-family: 'Post Grotesk Bold';
    align-items: flex-end;
    padding-bottom: 4px;
    justify-content: center;

    @include travel-type-color(color, $light: false);
  }

  .details {
    display: flex;
    flex-direction: column;
    line-height: 130%;
    .description {
      color: $color-main-60;
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
      <div
        class="rides {transformedData.travelLabel === 'Flug' ? 'plane' : $travelTypeRides}">
        {transformedData.rides}
      </div>
      <div class="details">
        <span class="description">{transformedData.travelLabel} zwischen</span>
        <div class="journey-container">
          <span class="journey">
            {transformedData.journey.start}
            und
            {transformedData.journey.destination}
          </span>
        </div>
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
