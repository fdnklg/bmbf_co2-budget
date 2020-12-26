<script>
</script>

<style lang="scss">
  @import "src/style/root.scss";
  .title {
    font-family: "Piazzolla Light";
    line-height: $line-height-m;
    text-align: center;
    font-size: $font-size-l;
    margin-bottom: $space-xl;

    @include respond-max-screen-phablet {
      font-size: $font-size-m;
      margin-bottom: $space-l;
    }
  }
</style>

<div class="title">
  <slot />
</div>
