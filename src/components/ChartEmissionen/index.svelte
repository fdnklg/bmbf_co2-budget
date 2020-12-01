<script>
  import Chart from "../Chart/Chart.svelte";
  import Bars from "../Chart/Bars.svelte";
  import Header from "../Chart/Header.svelte";
  import Footer from "../Chart/Footer.svelte";
  import Annotation from "../Chart/Annotation.svelte";

  import { emissionenActiveData } from "stores";
  import { afterUpdate } from "svelte";
</script>

<style lang="scss">
  @import "src/style/root.scss";
  .bar {
    height: 275px;
  }
  .barchart {
    padding: 1em var(--space-s) 2em var(--space-xs);
  }
  .container {
    color: white;
    height: auto;
    margin: 0 auto;
  }
</style>

<div data-embed-id="emissionen" class="container embed vis bar sticky padding">
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
