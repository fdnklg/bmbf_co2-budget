<script>
  import Chart from "./Chart/Chart.svelte";
  import Bars from "./Chart/Bars.svelte";
  import Header from "./Chart/Header.svelte";
  import Footer from "./Chart/Footer.svelte";
  import Annotation from "./Chart/Annotation.svelte";

  import { emissionenActiveData } from "stores";
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
  }
</style>

<div data-embed-id="emissionen" class="container embed sticky padding">
  {#if $emissionenActiveData}
    <Header data={$emissionenActiveData.meta} />
    <div class="barchart">
      <Chart
        subset={$emissionenActiveData.meta.subset}
        x1={0}
        x2={100}
        y1={0}
        y2={100}>
        <Bars data={$emissionenActiveData.d} />
        <Annotation data={$emissionenActiveData.annotation} />
      </Chart>
    </div>
    <Footer data={$emissionenActiveData.meta} />
  {/if}
</div>
