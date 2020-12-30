<script>
  import Box from './Box.svelte'
  import { formatNumber } from 'utils'

  export let data
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .bars {
    display: flex;
  }

  .bar-wrapper-label {
    align-items: center;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 8px;
  }

  .bar-label {
    font-size: $font-size-xs;
    color: white;
  }
</style>

<div class="bars">
  {#each data as d, i}
    <Box fill={d.fill} x1={0} x2={d.x}>
      <slot index={i} value={d} first={i === 0} last={i === data.length - 1} />
      <div class="bar-wrapper-label">
        <span class="bar-label">{#if d.showLabel}{d.type}{/if}</span>
        <span class="bar-label">{#if d.showValue}
            {#if d.customValue}
              {@html d.customValue}
            {:else}
              {@html formatNumber(d.format, d.value)}
            {/if}
          {/if}</span>
      </div>
    </Box>
  {/each}
</div>
