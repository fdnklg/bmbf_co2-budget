<script>
  import { szenarienData } from 'stores'

  export let step

  $: data = $szenarienData ? $szenarienData.find((d) => d.step === step) : null
  $: legendData = data ? data.legend : null

  function formatNumber(number) {
    if (number === 'Deine Reisedistanz') return number
    return `> ${number / 1000} kg`
  }
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
    font-size: 14px;

    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 3px;
    padding: 10px;
    @include respond-max-screen-phablet {
    }
  }

  .dot {
    width: 12px;
    height: 12px;
    min-width: 12px;
    min-height: 12px;
    border-radius: 100%;
    margin-right: 5px;

    &.dashed {
      background-color: transparent !important;
      border-style: dashed !important;
      border-width: 1px !important;

      @include respond-max-screen-phablet {
        transform: translateY(-9px);
      }
    }
  }

  .descrition {
    line-height: 140%;
    letter-spacing: $letter-spacing-s;
    padding-bottom: 10px;
  }

  .label {
    transform: translateY(1px);
    letter-spacing: $letter-spacing-s;
  }

  .labels {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    @include respond-max-screen-phablet {
      height: 76px;
    }
  }

  .item {
    display: flex;
    align-items: center;

    @include respond-max-screen-phablet {
      width: calc(50% - 5px);
      line-height: 140%;
    }
  }
</style>

<div class="legend">
  {#if legendData}
    {#if legendData.text}<span class="descrition">{legendData.text}</span>{/if}
    <div class="labels">
      {#each legendData.values as value}
        <div class="item">
          <div
            class="dot {value.value === 'Deine Reisedistanz' ? 'dashed' : ''}"
            style="background-color: {value.fill}; border: 1px solid {value.stroke}" />
          <span class="label">{formatNumber(value.value)}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>
