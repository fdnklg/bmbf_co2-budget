<script>
  import { szenarienDataActive } from "stores";

  import Chart from "../Chart/Chart.svelte";
  import Bars from "../Chart/Bars.svelte";
  import Header from "../Chart/Header.svelte";
  import Annotation from "../Chart/Annotation.svelte";
</script>

<style lang="scss">
  @import "src/style/root.scss";

  .barchart {
    padding: 1em var(--space-s) 2em var(--space-xs);
  }
  .container {
    background: white;
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    height: auto;
    margin: 0 auto;
    @include box-shadow;
  }
</style>

<div class="container sticky padding">
  {#if $szenarienDataActive}
    <Header data={$szenarienDataActive.widget.meta} />
    <div class="barchart">
      <Chart
        x1={0}
        x2={100}
        y1={0}
        y2={100}
        subset={$szenarienDataActive.widget.meta.subset}>
        <Bars data={$szenarienDataActive.widget.d} />
        <Annotation data={$szenarienDataActive.widget.annotation} />
      </Chart>
    </div>
  {/if}
</div>
