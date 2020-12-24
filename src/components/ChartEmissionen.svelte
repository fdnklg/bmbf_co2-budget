<script>
  import Chart from "./Chart/Chart.svelte";
  import Bars from "./Chart/Bars.svelte";
  import Header from "./Chart/Header.svelte";
  import Footer from "./Chart/Footer.svelte";
  import Annotation from "./Chart/Annotation.svelte";

  import { data } from "stores";

  export let step = 1.0;

  $: dataEmiss = $data
    ? $data.emissionen.find((item) => item.step === step)
    : false;
</script>

<style lang="scss">
  @import "src/style/root.scss";

  .barchart {
    padding: 1em var(--space-s) 2em var(--space-xs);
  }
  .container {
    color: white;
    height: auto;
    width: auto;
    max-width: $size-chart;
    margin: 0 auto;
    top: 50%;

    @include respond-max-screen-medium {
      max-width: auto;
      width: auto;
    }
  }
</style>

<div data-embed-id="emissionen" class="container embed sticky padding">
  {#if dataEmiss}
    <Header data={dataEmiss.meta} />
    <div class="barchart">
      <Chart subset={dataEmiss.meta.subset} x1={0} x2={100} y1={0} y2={100}>
        <Bars data={dataEmiss.d} />
        <Annotation data={dataEmiss.annotation} />
      </Chart>
    </div>
    <Footer data={dataEmiss.meta} />
  {/if}
</div>
