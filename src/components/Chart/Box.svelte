<script>
  import { getChartContext } from "./Chart.svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  export let x1 = 0;
  export let x2 = 1;
  export let y1 = 0;
  export let y2 = 1;
  export let fill;

  const { x_scale, y_scale } = getChartContext();

  const width = tweened(undefined, {
    duration: 300,
    easing: cubicOut,
  });

  $: {
    const _x1 = $x_scale(x1);
    const _x2 = $x_scale(x2);
    const _y1 = $y_scale(y1);
    const _y2 = $y_scale(y2);

    const left = Math.min(_x1, _x2);
    const right = Math.max(_x1, _x2);

    $width = right - left;
  }
</script>

<style>
  .box {
    background-color: black;
  }
</style>

<div
  class="box"
  style="width: {$width}%; background-color: {fill}; height: 28px;">
  <slot />
</div>
