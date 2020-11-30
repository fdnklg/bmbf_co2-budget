<script>
  import Chart from "../Chart/Chart.svelte";
  import Bars from "../Chart/Bars.svelte";
  import Header from "../Chart/Header.svelte";
  import Footer from "../Chart/Footer.svelte";
  import Annotation from "../Chart/Annotation.svelte";

  import { selectedData } from "stores";

  export let data;
</script>

<style>
  .bar {
    height: 275px;
  }
  .barchart {
    padding: 1em var(--space-s) 2em var(--space-xs);
  }
</style>

{#if $selectedData}
  <div class="vis bar sticky padding">
    <Header data={$selectedData.meta} />
    <div class="barchart">
      <Chart subset={$selectedData.meta.subset} x1={0} x2={100} y1={0} y2={100}>
        <Bars data={$selectedData.d} />
        <Annotation data={$selectedData.annotation} />
      </Chart>
    </div>
    <Footer data={$selectedData.meta} />
  </div>
{/if}
