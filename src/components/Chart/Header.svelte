<script>
  export let data;
</script>

<style>
  .chart-headline {
    font-size: var(--font-size-xl);
    line-height: var(--line-height-m);
  }

  .chart-subtitle {
    font-size: var(--font-size-m);
    color: var(--color-grey-0);
    line-height: var(--line-height-l);
    margin: 0;
  }
</style>

<div class="chart-headline">
  <h2 class="chart-headline">{data.title}</h2>
  <p class="chart-subtitle">{data.subtitle}</p>
</div>
