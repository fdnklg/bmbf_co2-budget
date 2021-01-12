<script>
  import { data } from 'stores'

  import Chart from './Chart/Chart.svelte'
  import Grid from './Chart/Grid.svelte'
  import Footer from './Chart/Footer.svelte'
  import Point from './Chart/Point.svelte'
  import Svg from './Chart/Svg.svelte'
  import Line from './Chart/Line.svelte'
  import { afterUpdate } from 'svelte'

  export let step = '2.1'

  $: dataSektoren = $data
    ? $data.sektoren.find((item) => item.step === step)
    : false

  afterUpdate(() => {
    console.log(dataSektoren)
  })
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  .linechart {
    padding: 2em 0 3em 2em;
    height: 220px;
    margin: auto;

    @include respond-max-screen-phablet {
      height: 100px;
      padding-left: 30px;
      width: calc(100% - 50px);
    }
  }

  .container {
    height: auto;
    width: 100%;
    max-width: $size-chart;
    margin: 0 auto;
    top: 25%;
    padding: $space-m;

    @include respond-max-screen-medium {
      max-width: none;
      width: auto;
    }

    @include respond-max-screen-phablet {
      padding-top: 10px;
    }
  }

  .grid-line {
    position: relative;
    display: block;
    text-align: right;
  }

  .grid-line.horizontal {
    width: auto;
    border-bottom: 1px dashed #ccc;
  }

  .data {
    fill: none;
    stroke: black;
    stroke-width: 1.5px;
    opacity: 1;
    @include transition-s;
    &.highlight {
      stroke-width: 3px;
      opacity: 1;
    }
  }

  .data-contour {
    stroke: white;
    opacity: 1;
    stroke-width: 5px;
    fill: none;
  }

  .x-label {
    position: absolute;
    width: 4em;
    bottom: -32px;
    font-size: 13px;
    text-align: center;
    color: $color-main-60;
  }

  .label {
    font-size: $font-size-xs;
    line-height: $line-height-s;
    color: $color-main;
    display: block;

    &.value {
      display: none;
    }

    @include respond-max-screen-phablet {
      display: none;

      &.value {
        display: block;
      }
    }
  }

  .grid-line {
    span.y-label {
      left: -33px;
      bottom: -12px;
      width: 26px;
      color: $color-main-60;
      font-size: 13px;
    }

    span.y-label-desc {
      left: -31px;
      top: -35px;
      color: $color-main-60;
      font-size: 13px;
    }
  }

  .legend {
    display: none;
    margin-bottom: 10px;
    @include respond-max-screen-phablet {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .legend-item {
    display: flex;
    align-items: center;
    margin-right: 10px;
    opacity: 0.35;

    &.highlighted {
      opacity: 1;
    }

    .legend-line {
      height: 3px;
      border-radius: 8px;
      width: 10px;
      margin-right: 5px;
    }

    .legend-label {
      font-size: $font-size-xs;
    }
  }
  .annotation {
    font-size: $font-size-s;
  }
  .grid-line span {
    position: absolute;
    left: 0;
    bottom: 2px;
    font-size: 14px;
    color: $color-light-60;
  }
</style>

<div class="container embed sticky padding">
  {#if dataSektoren}
    <div class="legend">
      {#each dataSektoren.d as sektor}
        <div class="legend-item {sektor.highlight ? 'highlighted' : ''}">
          <div
            style="background-color: {sektor.color.main}"
            class="legend-line" />
          <span
            style="color: {sektor.color.main}"
            class="legend-label">{sektor.name}</span>
        </div>
      {/each}
    </div>
    <div class="linechart">
      <Chart x1={1990} x2={2019} y1={60} y2={140}>
        <Grid horizontal count={4} let:value>
          <div class="grid-line horizontal">
            {#if value === 140}
              <span class="y-label-desc">CO2-Emissionen seit 1990 in Prozent</span>
            {/if}
            <span class="y-label">{value}</span>
          </div>
        </Grid>
        <Grid vertical count={5} let:value>
          <span class="x-label">{value}</span>
        </Grid>
        <Svg>
          {#each dataSektoren.d as sektor}
            <Line data={sektor.data} let:d>
              <path
                style="stroke: {sektor.highlight ? 'white' : 'transparent'};"
                class="data-contour"
                {d} />
            </Line>
            <Line data={sektor.data} let:d>
              <path
                style="stroke: {sektor.highlight ? sektor.color.main : sektor.color.light};"
                class="data {sektor.highlight ? 'highlight' : ''}"
                {d} />
            </Line>
          {/each}
        </Svg>
        {#each dataSektoren.d as sektor}
          {#if sektor.name === 'Verkehr' && step === '2.3'}
            <Point
              x={sektor.data.slice(-1)[0].x - 2}
              y={sektor.data.slice(-1)[0].y + 27}>
              <p style="color: {sektor.color.main}" class="label value">
                {@html `${sektor.data.slice(-1)[0].y}%`}
              </p>
            </Point>
          {/if}
        {/each}
        {#each dataSektoren.d as sektor}
          <Point
            x={sektor.data.slice(-1)[0].x + 0.5}
            y={sektor.data.slice(-1)[0].y + sektor.yOffset}>
            <p
              style="color: {sektor.highlight ? sektor.color.main : sektor.color.light}"
              class="label desktop">
              {sektor.name}
            </p>
          </Point>
        {/each}
      </Chart>
    </div>
    <Footer data={dataSektoren.meta} />
  {/if}
</div>
