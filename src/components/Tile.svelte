<script>
  export let active
  export let large
  export let isMap = false
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .tile {
    opacity: 0.5;
    padding: 15px;
    border: 1px solid transparent;
    margin-bottom: 40px;
    z-index: 20;
    @include transition-m;

    @include respond-max-screen-phablet {
      padding: 10px;
    }
  }

  .map {
    opacity: 0;
  }

  .large {
    padding: 45px;
  }

  .active {
    opacity: 0.999;
    background-image: linear-gradient(to top left, $color-tile-light, #f6f8f9);
    border: 1px solid $color-tile;
    border-radius: $border-radius-m;
    @include transition-m;
  }
</style>

<div
  class="tile {active ? 'active' : ''} {large ? 'large' : ''} {isMap ? 'map' : ''}">
  <slot />
</div>
