<script>
  import { sektorenData } from "stores";

  import Chart from "./Chart/Chart.svelte";
  import Grid from "./Chart/Grid.svelte";
  import Footer from "./Chart/Footer.svelte";
  import Header from "./Chart/Header.svelte";
  import Svg from "./Chart/Svg.svelte";
  import Line from "./Chart/Line.svelte";
</script>

<style lang="scss">
  @import "src/style/root.scss";

  .linechart {
    padding: 2em var(--space-s) 2em var(--space-xs);
    height: $height-vis;
    // width: calc(100% - 2em);
    margin: 0 auto;
  }

  .container {
    height: auto;
    width: 100%;
    max-width: $size-chart;
    margin: 0 auto;
    top: 25%;
    padding: $space-m;
  }

  .grid-line {
    position: relative;
    display: block;
  }

  .grid-line.horizontal {
    width: auto;
    border-bottom: 1px dashed #ccc;
  }

  .data {
    fill: none;
    stroke: black;
    stroke-width: 1px;
    &.highlight {
      stroke-width: 3px;
    }
  }

  .x-label {
    position: absolute;
    width: 4em;
    bottom: -32px;
    font-size: 14px;
    color: $color-light-60;
    text-align: center;
  }

  .grid-line span {
    position: absolute;
    left: 0;
    bottom: 2px;
    font-size: 14px;
    color: $color-light-60;
  }
</style>

<div data-embed-id="sektoren" class="container embed vis sticky padding">
  {#if $sektorenData}
    <Header data={$sektorenData.meta} />
    <div class="linechart">
      <Chart x1={1990} x2={2019} y1={60} y2={140}>
        <Grid horizontal count={4} let:value>
          <div class="grid-line horizontal"><span>{value}</span></div>
        </Grid>
        <Grid vertical count={5} let:value>
          <span class="x-label">{value}</span>
        </Grid>
        <Svg>
          {#each $sektorenData.d as sektor}
            <Line data={sektor.data} let:d>
              <path
                style="stroke: {sektor.color}"
                class="data {sektor.highlight ? 'highlight' : ''}"
                {d} />
            </Line>
          {/each}
        </Svg>
      </Chart>
    </div>
    <Footer data={$sektorenData.meta} />
  {/if}
</div>
