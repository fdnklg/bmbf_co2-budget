<script>
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .title {
    line-height: $line-height-m;
    letter-spacing: -0.25px;
    text-align: center;
    font-size: $font-size-xl;
    margin: auto;
    margin-bottom: $space-l;
    max-width: 550px;

    @include respond-max-screen-phablet {
      max-width: auto;
      font-size: $font-size-l;
      margin-bottom: $space-l;
    }
  }
</style>

<h2 class="title">
  <slot />
</h2>
