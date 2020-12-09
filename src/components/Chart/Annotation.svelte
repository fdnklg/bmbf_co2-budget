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
  .annotation {
    transform: translateY(10px);
    font-size: var(--font-size-s);
    letter-spacing: var(--spacing-m);
    color: var(--color-grey-0);
    width: auto;
    display: flex;
    position: absolute;
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

  .iconWrapper {
    height: 15px;
  }

  .flipped {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid var(--color-grey-0);
    /* transform: translateY(5px); */
    z-index: 100;
  }
</style>

<div
  style="{data.align}: {data.align === 'left' ? 100 - $pos : $pos}%;"
  class="annotation">
  {#if data.icon}
    <Icon name={data.icon} />
  {/if}
  <div>{data.label}</div>
  <div class="tip {data.align} flipped" />
</div>
