<script>
  export let active;
</script>

<style lang="scss">
  @import "src/style/root.scss";
  .tile {
    opacity: 0.5;
    padding: 15px;
    border: 1px solid transparent;
    margin-bottom: 40px;

    @include respond-max-screen-phablet {
      padding: 10px;
    }
  }

  .active {
    opacity: 1;
    background-image: linear-gradient(to top left, $color-tile-light, #f6f8f9);
    border: 1px solid $color-tile;
    border-radius: $border-radius-m;
  }
</style>

<div class="tile {active ? 'active' : ''}">
  <slot />
</div>
