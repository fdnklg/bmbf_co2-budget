<script>
  import Icon from "components/Icon.svelte";
  export let data;

  $: pos = 100 - data.x;
</script>

<style lang="scss">
  @import "src/style/root.scss";
  .annotation {
    bottom: 40px;
    position: absolute;
    transform: translateY(10px);
    font-size: $font-size-xs;
    color: $color-main;
    width: auto;
    display: flex;
    padding-right: 5px;
  }

  .tip {
    position: absolute;
    bottom: 3px;
    content: "";
    display: inline-block;
    width: auto;
    height: 0;
    position: absolute;

    &.left {
      left: 1px;
    }

    &.right {
      right: 4px;
    }
  }

  .right {
    transform: translate(2px, -2px);
  }

  .left {
    transform: translate(-10px, -2px);
  }

  .label {
    margin-bottom: 10px;
    line-height: $line-height-m;
  }

  .iconWrapper {
    height: 15px;
  }

  .flipped {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid $color-main;
    /* transform: translateY(5px); */
    z-index: 100;
  }
</style>

<div
  style="
    {data.align}: {data.align === 'left' ? 100 - pos : pos}%;
    text-align: {data.align === 'right' ? 'right' : 'left'};"
  class="annotation">
  {#if data.icon}
    <Icon name={data.icon} />
  {/if}
  <p class="label {data.align}">{data.label}</p>
  <div class="tip {data.align} flipped" />
</div>
