<script>
  import Chart from "../Chart/Chart.svelte";
  import Bars from "../Chart/Bars.svelte";
  import Header from "../Chart/Header.svelte";
  import Footer from "../Chart/Footer.svelte";
  import Annotation from "../Chart/Annotation.svelte";

  import { selectedData } from "stores";
</script>

<style lang="scss">
  @import "src/style/root.scss";
  .barchart {
    padding: 1em var(--space-s) 2em var(--space-xs);
    height: $height-vis;
  }
</style>

{#if $selectedData}
  <div class="vis sticky padding">
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
