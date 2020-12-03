<script>
  import Box from "./Box.svelte";

  export let data;
  export let x = (d) => d.x;
</script>

<style>
  .bars {
    display: flex;
  }

  .bar-wrapper-label {
    display: flex;
    justify-content: space-between;
    padding: 0 var(--space-m);
  }

  .bar-label {
    font-size: var(--font-size-s);
    color: var(--color-white);
    letter-spacing: var(--spacing-m);
  }
</style>

<div class="bars">
  {#each data as d, i}
    <Box fill={d.fill} x1={0} x2={x(d, i)}>
      <slot index={i} value={d} first={i === 0} last={i === data.length - 1} />
      {#if d.showLabel}
        <div class="bar-wrapper-label">
          <span class="bar-label">{d.type}</span>
          <span class="bar-label">{d.x}&thinsp;%</span>
        </div>
      {/if}
    </Box>
  {/each}
</div>
