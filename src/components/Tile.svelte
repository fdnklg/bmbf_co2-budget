<script>
  export let active;
  export let isMap;
</script>

<style lang="scss">
  @import "src/style/root.scss";
  .tile {
    opacity: 0.5;
    padding: 15px;
    border: 1px solid transparent;
    margin-bottom: 40px;
    @include transition-m;

    @include respond-max-screen-phablet {
      padding: 10px;
    }
  }

  .map {
    opacity: 0;
  }

  .active {
    opacity: 0.999;
    background-image: linear-gradient(to top left, $color-tile-light, #f6f8f9);
    border: 1px solid $color-tile;
    border-radius: $border-radius-m;
    @include transition-m;
  }
</style>

<div class="tile {active ? 'active' : ''} {isMap ? 'map' : ''}">
  <slot />
</div>
