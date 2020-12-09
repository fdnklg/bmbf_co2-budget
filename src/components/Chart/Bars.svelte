<script>
  import Box from "./Box.svelte";
  import { formatNumber } from "utils";

  export let data;
  export let x = (d) => d.x;

  console.log("bars data", data);
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
      <div class="bar-wrapper-label">
        <span class="bar-label">{#if d.showLabel}{d.type}{/if}</span>
        <span class="bar-label">{#if d.showValue}
            {@html formatNumber(d.format, d.value)}
          {/if}</span>
      </div>
    </Box>
  {/each}
</div>
