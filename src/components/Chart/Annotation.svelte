<script>
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import Icon from "components/Icon.svelte";

  export let data;

  const pos = tweened(undefined, {
    duration: 300,
    easing: cubicOut,
  });

  $: {
    $pos = 100 - data.x;
  }
</script>

<style lang="scss">
  @import "src/style/root.scss";
  .annotation {
    transform: translateY(10px);
    font-size: $font-size-xs;
    color: $color-main-light;
    width: auto;
    display: flex;
  }

  .tip {
    position: absolute;
    content: "";
    display: inline-block;
    width: auto;
    height: 0;
    position: absolute;

    &.left {
      left: 0;
    }

    &.right {
      right: 0;
    }
  }

  .right {
    transform: translate(-6px, -2px);
  }

  .left {
    transform: translate(-1px, -2px);
  }

  .label {
    line-height: $line-height-m;
  }

  .iconWrapper {
    height: 15px;
  }

  .flipped {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid $color-main-light;
    /* transform: translateY(5px); */
    z-index: 100;
  }
</style>

<div
  style="
    {data.align}: {data.align === 'left' ? 100 - $pos : $pos}%;
    text-align: {data.align === 'right' ? 'right' : 'left'};"
  class="annotation">
  {#if data.icon}
    <Icon name={data.icon} />
  {/if}
  <p class="label">{data.label}</p>
  <div class="tip {data.align} flipped" />
</div>
