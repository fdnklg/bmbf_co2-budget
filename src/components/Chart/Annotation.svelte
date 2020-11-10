<script>
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  export let data;

  const pos = tweened(undefined, {
    duration: 300,
    easing: cubicOut,
  });

  $: {
    $pos = 100 - data.x;
  }
</script>

<style>
  .annotation {
    transform: translateY(10px);
    font-size: var(--font-size-s);
    letter-spacing: var(--spacing-m);
    color: var(--color-grey-0);
    width: auto;
    position: absolute;
  }

  .tip {
    position: absolute;
    content: "";
    display: inline-block;
    width: auto;
    height: 0;
  }

  .right {
    transform: translate(-6px, -2px);
  }

  .left {
    transform: translate(-1px, -2px);
  }

  .flipped {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid var(--color-grey-0);
    /* transform: translateY(5px); */
    z-index: 100;
  }
</style>

<div style="right: {$pos}%;" class="annotation">
  {#if data.align === 'left'}<span class="tip {data.align} flipped" />{/if}
  <span>{data.label}</span>
  {#if data.align === 'right'}<span class="tip {data.align} flipped" />{/if}
</div>
