<script>
  export let items;
  export let current;
  export let index;

  $: label = current ? current.x : "";
</script>

<style lang="scss">
  @import "src/style/root.scss";
  .container {
    position: absolute;
    bottom: 20px;
    left: 20px;
    z-index: 1000;

    @include respond-max-screen-medium {
      top: 20px;
      bottom: none;
    }
  }
  .dots {
    display: flex;
  }
  .dot {
    width: 8px;
    height: 8px;
    margin-right: 7px;
    border-radius: 100%;
    border: 1px solid $color-main;
    background-color: none;

    &.active {
      background-color: $color-main;
    }
  }
  .label {
    @include type-small;
  }
</style>

<div class="container">
  <div class="dots">
    {#each items as item, i}
      <div class="dot {i === index ? 'active' : ''}" />
    {/each}
  </div>
  <span class="label">{label} Hier später mehr Kontext</span>
</div>
