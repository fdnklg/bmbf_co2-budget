<script>
  export let title;
  export let subtitle;
</script>

<style lang="scss">
  @import "src/style/root.scss";
  .title {
    font-size: var(--font-size-xl);
  }

  .subtitle {
    @include font-small;
    line-height: 150%;
  }
</style>

<div class="intro">
  <h2 class="title">{title}</h2>
  <p class="subtitle">{subtitle}</p>
</div>
