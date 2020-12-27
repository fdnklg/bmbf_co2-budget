<script>
  export let title;
  export let subtitle;
</script>

<style lang="scss">
  @import "src/style/root.scss";
  .title {
    font-size: $font-size-l;
    color: $color-main;
    margin-bottom: 0px;
  }

  .subtitle {
    font-size: $font-size-s;
    letter-spacing: $letter-spacing-s;
    line-height: 150%;
    color: $color-main-60;
    margin-top: 10px;
    margin-bottom: 20px;
  }
</style>

<div class="intro">
  <h2 class="title">{title}</h2>
  <p class="subtitle">{subtitle}</p>
</div>
