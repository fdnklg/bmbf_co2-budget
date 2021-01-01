<script>
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .title {
    font-family: 'Piazzolla Light';
    line-height: $line-height-m;
    text-align: center;
    font-size: $font-size-xl;
    margin: auto;
    margin-bottom: $space-xl;
    max-width: 550px;

    @include respond-max-screen-phablet {
      max-width: auto;
      font-size: $font-size-m;
      margin-bottom: $space-l;
    }
  }
</style>

<div class="title">
  <slot />
</div>
