<script>
  import { afterUpdate } from 'svelte'
  import { co2PerKm } from 'constants'

  import Loading from 'components/Loading.svelte'
  import Chart from './Chart/Chart.svelte'
  import Bars from './Chart/Bars.svelte'
  import Footer from './Chart/Footer.svelte'
  import Annotation from './Chart/Annotation.svelte'

  export let data
  export let distance
  export let width

  let transformedData = false

  function getPercentPerBar(rides, width) {
    const spacesPx = rides - 1
    const percentInPx = width / 100
    const percent = spacesPx / percentInPx
    const percentPerBar = percent / rides

    return percentPerBar
  }

  function transformData(data, width) {
    const co2Plane = distance * co2PerKm.plane // gram
    const rides = parseInt(co2Plane / data.co2)
    const barSlice = 100 / rides

    const percentPerBar = getPercentPerBar(rides, width)

    let arr = Array.from(Array(rides).keys())
    arr = arr.map((d) => ({
      value: barSlice,
      x: barSlice - percentPerBar,
      format: 'percent',
      showLabel: false,
      showValue: false,
    }))
    return {
      ...data,
      rides,
      co2Plane,
      data: arr,
    }
  }

  const meta = {
    source: {
      label: 'Europäische Umweltagentur',
      url: 'https://www.europarl.europa.eu/',
    },
  }

  /*

  - ermittle breite des containers
  - addiere alle zwischenräume in pixel

  */

  afterUpdate(() => {
    transformedData = transformData(data, width)
  })
</script>

<style lang="scss">
  .fahrt {
    margin: 30px 0;
    max-width: 768px;
  }
</style>

<div class="fahrt">
  {#if transformedData}
    <div class="chart-header"><span>{transformedData.city}</span></div>
    <div class="wrapper">
      <Chart x1={0} x2={100} y1={0} y2={100}>
        <Annotation data={'Annotation hier'} />
        <Bars data={transformedData.data} />
      </Chart>
    </div>
    <Footer data={meta} />
  {:else}
    <Loading />
  {/if}
</div>
