<script>
  export let active
  export let full = false
  export let large = false
  export let isMap = false
  export let small = false
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .tile {
    opacity: 0.5;
    padding: 15px;
    border: 1px solid transparent;
    margin: auto;
    max-width: 550px;
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

    @include respond-max-screen-phablet {
      padding: 15px;
    }
  }

  .full {
    width: 100%;
  }

  .small {
    width: calc(100% - 40px);
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
  class="tile {small ? 'small' : ''} {active ? 'active' : ''} {large ? 'large' : ''} {isMap ? 'map' : ''} {full ? 'full' : ''}">
  <slot />
</div>
