<script>
  import Icon from "components/Icon.svelte";
  import { colors } from "config";
  export let coords;
  export let name;

  $: x = coords ? coords.x : 0;
  $: y = coords ? coords.y : 0;
  $: color = colors[name];

  let dim = 26;
</script>

<style lang="scss">
  @import "src/style/root.scss";
  .icon {
    position: absolute;
    width: 48px;
    height: 48px;
    background-color: white;
    border-radius: 100%;
    border: 2px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    @include box-shadow-btn;
  }
</style>

<div
  class="icon"
  style="
    left: {x - dim}px; 
    top: {y - dim}px; 
    border-color: {color};">
  <Icon {name} />
</div>
