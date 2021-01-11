<script>
  import { afterUpdate } from 'svelte'
  import { szenarienData } from 'stores'

  export let step

  $: data = $szenarienData ? $szenarienData.find((d) => d.step === step) : null
  $: legendData = data ? data.legend : null

  function formatNumber(number) {
    return number / 1000
  }

  afterUpdate(() => {
    if (data) console.log(data.legend)
  })
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  .legend {
    position: absolute;
    display: flex;
    flex-direction: column;
    bottom: 20px;
    left: 20px;
    z-index: 10;
    width: 200px;
    font-size: 13px;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 100%;
    margin-right: 5px;
  }

  .label {
    transform: translateY(1px);
  }

  .item {
    display: flex;
    align-items: center;
  }
</style>

<div class="legend">
  {#if legendData}
    <span>{legendData.text}</span>
    <div class="labels">
      {#each legendData.values as value}
        <div class="item">
          <div
            class="dot"
            style="background-color: {value.fill}; border: 1px solid {value.stroke}" />
          <span class="label">{formatNumber(value.value)}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>
